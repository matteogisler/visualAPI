"use client";

import { Edge, NodeData, WorkflowData } from "./types";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export interface ExecutionResult {
  nodeId: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "running" | "completed" | "failed";
  results: ExecutionResult[];
  startTime: string;
  endTime?: string;
}

export async function executeWorkflow(workflow: WorkflowData): Promise<WorkflowExecution> {
  const execution: WorkflowExecution = {
    id: crypto.randomUUID(),
    workflowId: workflow.id,
    status: "running",
    results: [],
    startTime: new Date().toISOString(),
  };

  try {
    const sortedNodes = sortNodesByDependency(workflow.nodes, workflow.edges);
    
    for (const node of sortedNodes) {
      const result = await executeNode(node);
      execution.results.push(result);
      
      if (!result.success) {
        execution.status = "failed";
        break;
      }
    }

    if (execution.status === "running") {
      execution.status = "completed";
    }
  } catch (error: any) {
    execution.status = "failed";
    execution.results.push({
      nodeId: "workflow",
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  execution.endTime = new Date().toISOString();
  await saveExecution(execution);
  return execution;
}

async function executeNode(node: NodeData): Promise<ExecutionResult> {
  try {
    switch (node.type) {
      case "httpRequest": {
        const credentials = await getCredentials(node.data.credentialId);
        const headers = {
          ...node.data.headers,
          ...(credentials?.headers || {}),
        };

        const response = await fetch(node.data.url, {
          method: node.data.method,
          headers,
          body: node.data.method !== "GET" ? JSON.stringify(node.data.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
          nodeId: node.id,
          success: true,
          data,
          timestamp: new Date().toISOString(),
        };
      }
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  } catch (error: any) {
    return {
      nodeId: node.id,
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

function sortNodesByDependency(nodes: NodeData[], edges: Edge[]): NodeData[] {
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  // Initialize graph and in-degree
  nodes.forEach(node => {
    graph.set(node.id, new Set());
    inDegree.set(node.id, 0);
  });

  // Build graph
  edges.forEach(edge => {
    graph.get(edge.source)?.add(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  // Topological sort
  const sorted: NodeData[] = [];
  const queue: string[] = [];

  // Add nodes with no dependencies to queue
  nodes.forEach(node => {
    if ((inDegree.get(node.id) || 0) === 0) {
      queue.push(node.id);
    }
  });

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const node = nodeMap.get(nodeId)!;
    sorted.push(node);

    graph.get(nodeId)?.forEach(neighbor => {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
}

async function saveExecution(execution: WorkflowExecution) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const executionRef = doc(collection(db, "users", user.uid, "executions"), execution.id);
  await setDoc(executionRef, execution);
}

async function getCredentials(credentialId?: string) {
  if (!credentialId) return null;

  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const credentialRef = doc(collection(db, "users", user.uid, "credentials"), credentialId);
  const credentialDoc = await getDoc(credentialRef);
  
  if (!credentialDoc.exists()) {
    throw new Error("Credential not found");
  }

  return credentialDoc.data();
}
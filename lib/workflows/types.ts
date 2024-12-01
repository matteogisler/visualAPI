export interface NodeData {
  id: string;
  type: string;
  data: {
    label: string;
    [key: string]: any;
  };
  position?: {
    x: number;
    y: number;
  };
}

export interface WorkflowData {
  id: string;
  name: string;
  description?: string;
  nodes: NodeData[];
  edges: Edge[];
  status: "draft" | "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface TestResult {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data?: any;
  error?: string;
  timestamp: string;
}
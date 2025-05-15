import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { WorkflowData } from "./types";

export const saveUser = async (
  userId: string,
  name: string | null,
  email: string | null,
) => {
  const userSnap = await getDoc(doc(db, "users", userId));
  if (!userSnap.exists()) {
    await setDoc(doc(db, "users", userId), {
      name,
      email,
    });
  }
};

export async function saveWorkflow(workflow: Partial<WorkflowData>): Promise<WorkflowData> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const isNew = !workflow.id;
  const now = new Date().toISOString();

  const workflowData: WorkflowData = {
    id: workflow.id || crypto.randomUUID(),
    name: workflow.name || "Untitled Workflow",
    description: workflow.description || "",
    nodes: workflow.nodes || [],
    edges: workflow.edges || [],
    status: workflow.status || "draft",
    createdAt: workflow.createdAt || now,
    updatedAt: now,
  };

  const workflowRef = doc(
    collection(db, "users", user.uid, "workflows"),
    workflowData.id
  );
  
  await setDoc(workflowRef, workflowData);
  return workflowData;
}

export async function getWorkflow(id: string): Promise<WorkflowData> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const workflowRef = doc(collection(db, "users", user.uid, "workflows"), id);
  const workflowDoc = await getDoc(workflowRef);
  
  if (!workflowDoc.exists()) {
    throw new Error("Workflow not found");
  }

  return workflowDoc.data() as WorkflowData;
}

export async function getWorkflows(userId: string): Promise<WorkflowData[]> {
  const workflowsRef = collection(db, "users", userId, "workflows");
  const q = query(workflowsRef, orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as WorkflowData);
}

export async function deleteWorkflow(id: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const workflowRef = doc(collection(db, "users", user.uid, "workflows"), id);
  await deleteDoc(workflowRef);
}
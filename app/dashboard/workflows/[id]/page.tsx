import { getWorkflows } from "@/lib/workflows/storage";
import WorkflowClient from "../workflow-client";

export default function WorkflowPage({ params }: { params: { id: string } }) {
  return <WorkflowClient id={params.id} />;
}

export async function generateStaticParams() {
  // Replace this with your actual API or database query
  const workflows = await getWorkflows(); // Fetch all workflows dynamically

  return workflows.map((workflow) => ({
    id: workflow.id,
  }));
}


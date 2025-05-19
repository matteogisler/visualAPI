import { getWorkflows } from "@/lib/workflows/storage";
import WorkflowClient from "../workflow-client";

export default function WorkflowPage({ params }: { params: { id: string } }) {
  return <WorkflowClient id={params.id} />;
}

export async function generateStaticParams() {
  // const workflows = await getWorkflows(); 

  // return workflows.map((workflow) => ({
  //   id: workflow.id,
  // }));
}


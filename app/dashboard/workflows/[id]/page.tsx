// Server component (no "use client")

import WorkflowClient from "../workflow-client";

export default function WorkflowPage({ params }: { params: { id: string } }) {
  return <WorkflowClient id={params.id} />;
}

export async function generateStaticParams() {
  // Fetch or provide static paths for dynamic IDs
  const workflows = [
    { id: "1" },
    { id: "2" },
    { id: "3" }, // Example workflow IDs
  ];

  return workflows.map((workflow) => ({
    id: workflow.id,
  }));
}

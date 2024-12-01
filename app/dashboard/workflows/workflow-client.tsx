"use client";

import { WorkflowBuilder } from "@/components/workflows/workflow-builder";
import { WorkflowHeader } from "@/components/workflows/workflow-header";
import { WorkflowSidebar } from "@/components/workflows/workflow-sidebar";

export default function WorkflowClient({ id }: { id: string }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <WorkflowHeader workflowId={id} />
        <div className="flex-1 flex">
          <WorkflowBuilder workflowId={id} />
          <WorkflowSidebar />
        </div>
      </div>
    </div>
  );
}

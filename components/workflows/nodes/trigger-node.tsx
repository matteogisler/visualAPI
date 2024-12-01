"use client";

import { Handle, Position } from "reactflow";

export function TriggerNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md border bg-background">
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center">
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  );
}
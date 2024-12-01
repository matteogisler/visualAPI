"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkflowData } from "@/lib/workflows/types";
import { getWorkflows } from "@/lib/workflows/storage";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

export function WorkflowList() {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        const data = await getWorkflows();
        setWorkflows(data);
      } catch (error) {
        console.error("Failed to load workflows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkflows();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first workflow to get started
        </p>
        <Button asChild>
          <Link href="/dashboard/workflows/new">Create Workflow</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {workflows.map((workflow) => (
        <Card key={workflow.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{workflow.name}</CardTitle>
                <CardDescription>
                  Last updated{" "}
                  {formatDistanceToNow(new Date(workflow.updatedAt), {
                    addSuffix: true,
                  })}
                </CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/workflows/${workflow.id}`}>
                  Edit Workflow
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
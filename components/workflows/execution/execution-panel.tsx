"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WorkflowData } from "@/lib/workflows/types";
import { ExecutionResult, executeWorkflow } from "@/lib/workflows/execution";
import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ExecutionPanelProps {
  open: boolean;
  onClose: () => void;
  workflow: WorkflowData;
}

export function ExecutionPanel({
  open,
  onClose,
  workflow,
}: ExecutionPanelProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<ExecutionResult[]>([]);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const execution = await executeWorkflow(workflow);
      setResults(execution.results);
    } catch (error) {
      console.error("Workflow execution failed:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Execute Workflow</SheetTitle>
          <SheetDescription>
            Run and monitor your workflow execution
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Button
            onClick={handleExecute}
            disabled={isExecuting}
            className="w-full"
          >
            {isExecuting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {isExecuting ? "Executing..." : "Execute Workflow"}
          </Button>

          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Execution Results</h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {results.map((result) => (
                    <div
                      key={result.nodeId}
                      className={cn(
                        "p-4 rounded-lg border",
                        result.success
                          ? "bg-green-50 border-green-100 dark:bg-green-950 dark:border-green-900"
                          : "bg-red-50 border-red-100 dark:bg-red-950 dark:border-red-900"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-medium">
                            Node: {result.nodeId}
                          </div>
                          {result.error ? (
                            <div className="text-sm text-red-600 dark:text-red-400">
                              Error: {result.error}
                            </div>
                          ) : (
                            <pre className="text-xs bg-background/50 p-2 rounded-md overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NodeData } from "@/lib/workflows/types";
import { ResponseViewer } from "./response-viewer";
import { TestResult } from "@/lib/workflows/types";
import { Play, StopCircle } from "lucide-react";

interface RequestTesterProps {
  node: NodeData;
}

export function RequestTester({ node }: RequestTesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const runTest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(node.data.url, {
        method: node.data.method,
        headers: node.data.headers,
        body: node.data.method !== "GET" ? JSON.stringify(node.data.body) : undefined,
      });

      const data = await response.json();
      setResult({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      setResult({
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Test Request</h3>
        <Button
          size="sm"
          onClick={runTest}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <StopCircle className="w-4 h-4 mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Test
            </>
          )}
        </Button>
      </div>

      {result && <ResponseViewer result={result} />}
    </Card>
  );
}
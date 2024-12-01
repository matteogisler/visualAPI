"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiEndpoint } from "@/lib/api-docs/types";
import { cn } from "@/lib/utils";

interface EndpointCardProps {
  endpoint: ApiEndpoint;
  onClick: () => void;
}

export function EndpointCard({ endpoint, onClick }: EndpointCardProps) {
  const methodColors = {
    GET: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    POST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <Card className="cursor-pointer hover:border-primary/50" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "font-mono",
                  methodColors[endpoint.method as keyof typeof methodColors]
                )}
              >
                {endpoint.method}
              </Badge>
              <code className="text-sm font-mono">{endpoint.path}</code>
            </div>
            <CardTitle className="text-base">{endpoint.summary}</CardTitle>
            {endpoint.description && (
              <CardDescription>{endpoint.description}</CardDescription>
            )}
          </div>
          <Button variant="ghost" size="sm">
            Add to Workflow
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
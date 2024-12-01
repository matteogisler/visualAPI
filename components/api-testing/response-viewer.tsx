"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResult } from "@/lib/api-testing/types";
import { formatDistanceToNow } from "date-fns";
import { Clock, HardDrive } from "lucide-react";

interface ResponseViewerProps {
  result: TestResult | null;
}

export function ResponseViewer({ result }: ResponseViewerProps) {
  if (!result) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Send a request to see the response
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="destructive">Error</Badge>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
          </span>
        </div>
        <pre className="bg-muted p-2 rounded-md text-sm overflow-auto">
          {result.error}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Badge
          variant={result.status && result.status < 400 ? "default" : "destructive"}
        >
          {result.status} {result.statusText}
        </Badge>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {result.duration ? `${Math.round(result.duration)}ms` : "N/A"}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HardDrive className="w-4 h-4" />
          {result.size ? `${(result.size / 1024).toFixed(1)} KB` : "N/A"}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="headers">
          <AccordionTrigger>Response Headers</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre className="text-sm">
                {JSON.stringify(result.headers, null, 2)}
              </pre>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="body">
          <AccordionTrigger>Response Body</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre className="text-sm">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
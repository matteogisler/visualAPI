"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResult } from "@/lib/workflows/types";
import { formatDistanceToNow } from "date-fns";

interface ResponseViewerProps {
  result: TestResult;
}

export function ResponseViewer({ result }: ResponseViewerProps) {
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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge
          variant={result.status >= 200 && result.status < 300 ? "default" : "destructive"}
        >
          {result.status} {result.statusText}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
        </span>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="headers">
          <AccordionTrigger className="text-sm">Response Headers</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre className="text-sm">
                {JSON.stringify(result.headers, null, 2)}
              </pre>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="body">
          <AccordionTrigger className="text-sm">Response Body</AccordionTrigger>
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
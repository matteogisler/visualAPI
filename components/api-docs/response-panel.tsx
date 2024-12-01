"use client";

import { ApiEndpoint } from "@/lib/api-docs/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

interface ResponsePanelProps {
  endpoint: ApiEndpoint;
}

export function ResponsePanel({ endpoint }: ResponsePanelProps) {
  return (
    <Accordion type="single" collapsible>
      {Object.entries(endpoint.responses).map(([status, response]) => (
        <AccordionItem key={status} value={status}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge
                variant={parseInt(status) < 400 ? "default" : "destructive"}
              >
                {status}
              </Badge>
              <span>{response.description}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {response.content && (
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre className="text-sm">
                  {JSON.stringify(
                    Object.values(response.content)[0].schema,
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
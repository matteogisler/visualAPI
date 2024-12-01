"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiEndpoint } from "@/lib/api-docs/types";
import { RequestPanel } from "./request-panel";
import { ResponsePanel } from "./response-panel";

interface DocumentationDialogProps {
  open: boolean;
  onClose: () => void;
  endpoint: ApiEndpoint;
  onAddToWorkflow: (endpoint: ApiEndpoint) => void;
}

export function DocumentationDialog({
  open,
  onClose,
  endpoint,
  onAddToWorkflow,
}: DocumentationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{endpoint.summary}</DialogTitle>
          <DialogDescription>{endpoint.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="request" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="request" className="flex-1">
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="flex-1">
              Response
            </TabsTrigger>
          </TabsList>
          <TabsContent value="request">
            <RequestPanel endpoint={endpoint} />
          </TabsContent>
          <TabsContent value="response">
            <ResponsePanel endpoint={endpoint} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onAddToWorkflow(endpoint)}>
            Add to Workflow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
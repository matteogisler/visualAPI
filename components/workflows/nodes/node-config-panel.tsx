"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NodeData } from "@/lib/workflows/types";
import { WebhookConfig } from "./config/webhook-config";
import { HttpRequestConfig } from "./config/http-request-config";
import { RequestTester } from "../testing/request-tester";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NodeConfigPanelProps {
  open: boolean;
  onClose: () => void;
  node: NodeData | null;
  onUpdate: (nodeId: string, data: any) => void;
}

export function NodeConfigPanel({
  open,
  onClose,
  node,
  onUpdate,
}: NodeConfigPanelProps) {
  if (!node) return null;

  const getConfigComponent = () => {
    switch (node.type) {
      case "webhook":
        return <WebhookConfig node={node} onUpdate={onUpdate} />;
      case "httpRequest":
        return <HttpRequestConfig node={node} onUpdate={onUpdate} />;
      default:
        return <div>Configuration not available</div>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{node.data.label}</SheetTitle>
          <SheetDescription>
            Configure and test this node
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="config" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="config" className="flex-1">
              Configuration
            </TabsTrigger>
            <TabsTrigger value="test" className="flex-1">
              Testing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="config" className="mt-4">
            {getConfigComponent()}
          </TabsContent>
          <TabsContent value="test" className="mt-4">
            <RequestTester node={node} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Key } from "lucide-react";

interface NewKeyDialogProps {
  open: boolean;
  onClose: () => void;
  apiKey: {
    name: string;
    key: string;
  };
}

export function NewKeyDialog({ open, onClose, apiKey }: NewKeyDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Created</DialogTitle>
          <DialogDescription>
            Your new API key has been created. Make sure to copy it now as you
            won't be able to see it again.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Key Name</div>
            <div className="text-sm text-muted-foreground">{apiKey.name}</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">API Key</div>
            <div className="p-4 bg-muted rounded-lg flex items-center gap-4">
              <div className="p-2 rounded-full bg-background">
                <Key className="w-4 h-4" />
              </div>
              <code className="flex-1 font-mono text-sm break-all">
                {apiKey.key}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="shrink-0"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
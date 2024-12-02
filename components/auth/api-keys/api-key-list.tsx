"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Key, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const apiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "pk_live_123456789",
    createdAt: "2024-03-01T10:00:00Z",
    lastUsed: "2024-03-20T15:30:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "pk_test_987654321",
    createdAt: "2024-03-10T14:00:00Z",
    lastUsed: "2024-03-20T14:45:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Test API Key",
    key: "pk_test_567890123",
    createdAt: "2024-03-15T09:00:00Z",
    lastUsed: null,
    status: "inactive",
  },
];

export function ApiKeyList() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyKey = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Manage your API keys for authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Key className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{apiKey.name}</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-muted-foreground font-mono">
                      {apiKey.key}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                    >
                      <Copy className="w-3 h-3" />
                      {copiedId === apiKey.id && (
                        <span className="ml-2 text-xs">Copied!</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={apiKey.status === "active" ? "default" : "secondary"}
                >
                  {apiKey.status}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {apiKey.lastUsed
                    ? `Last used ${formatDistanceToNow(
                        new Date(apiKey.lastUsed),
                        { addSuffix: true }
                      )}`
                    : "Never used"}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Regenerate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Revoke
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
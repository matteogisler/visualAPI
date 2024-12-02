"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Globe, Slack } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const connections = [
  {
    id: "1",
    name: "GitHub",
    icon: Github,
    status: "connected",
    connectedAt: "2024-03-01T10:00:00Z",
    scopes: ["repo", "user"],
  },
  {
    id: "2",
    name: "Slack",
    icon: Slack,
    status: "connected",
    connectedAt: "2024-03-15T14:30:00Z",
    scopes: ["chat:write", "channels:read"],
  },
  {
    id: "3",
    name: "Custom OAuth",
    icon: Globe,
    status: "disconnected",
    connectedAt: null,
    scopes: [],
  },
];

export function OAuthConnections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>OAuth Connections</CardTitle>
        <CardDescription>
          Manage your OAuth application connections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.map((connection) => {
            const Icon = connection.icon;
            return (
              <div
                key={connection.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{connection.name}</div>
                    {connection.status === "connected" && (
                      <div className="text-sm text-muted-foreground">
                        Connected{" "}
                        {formatDistanceToNow(
                          new Date(connection.connectedAt!),
                          { addSuffix: true }
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {connection.status === "connected" && (
                    <div className="flex gap-2">
                      {connection.scopes.map((scope) => (
                        <Badge key={scope} variant="secondary">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Button
                    variant={
                      connection.status === "connected"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {connection.status === "connected"
                      ? "Disconnect"
                      : "Connect"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
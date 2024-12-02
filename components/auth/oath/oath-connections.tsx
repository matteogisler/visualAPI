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
import { Github, Globe, Slack } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ConnectOAuthDialog } from "./connect-oauth-dialog";
import { connectOAuth, disconnectOAuth } from "@/lib/auth/oauth";

const services = {
  github: {
    name: "GitHub",
    icon: Github,
    description: "Connect your GitHub account to enable repository access",
    defaultScopes: ["repo", "user"],
  },
  slack: {
    name: "Slack",
    icon: Slack,
    description: "Connect Slack to enable messaging and channel management",
    defaultScopes: ["chat:write", "channels:read"],
  },
  custom: {
    name: "Custom OAuth",
    icon: Globe,
    description: "Connect a custom OAuth 2.0 provider",
    defaultScopes: [],
  },
};

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
  const [selectedService, setSelectedService] = useState<keyof typeof services | null>(
    null
  );

  const handleConnect = async (data: any) => {
    if (!selectedService) return;

    try {
      await connectOAuth(selectedService, data);
      // Refresh connections list
    } catch (error) {
      console.error("Failed to connect OAuth:", error);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      await disconnectOAuth(connectionId);
      // Refresh connections list
    } catch (error) {
      console.error("Failed to disconnect OAuth:", error);
    }
  };

  return (
    <>
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
                      onClick={() =>
                        connection.status === "connected"
                          ? handleDisconnect(connection.id)
                          : setSelectedService(connection.name.toLowerCase() as keyof typeof services)
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

      {selectedService && (
        <ConnectOAuthDialog
          open={true}
          onClose={() => setSelectedService(null)}
          onConnect={handleConnect}
          service={services[selectedService]}
        />
      )}
    </>
  );
}
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, CheckCircle, Key, Lock } from "lucide-react";

const logs = [
  {
    id: "1",
    type: "api_key",
    action: "key_created",
    status: "success",
    details: "Created new API key: Production API Key",
    timestamp: "2024-03-20T15:30:00Z",
    ip: "192.168.1.1",
  },
  {
    id: "2",
    type: "authentication",
    action: "login_attempt",
    status: "failed",
    details: "Failed login attempt from unauthorized IP",
    timestamp: "2024-03-20T15:15:00Z",
    ip: "192.168.1.2",
  },
  {
    id: "3",
    type: "oauth",
    action: "token_refresh",
    status: "success",
    details: "Refreshed OAuth token for GitHub integration",
    timestamp: "2024-03-20T14:45:00Z",
    ip: "192.168.1.1",
  },
];

export function AccessLogs() {
  const getIcon = (type: string) => {
    switch (type) {
      case "api_key":
        return <Key className="w-4 h-4" />;
      case "authentication":
        return <Lock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Logs</CardTitle>
        <CardDescription>
          Monitor authentication and access attempts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-4 rounded-lg border"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    {getIcon(log.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={log.status === "success" ? "default" : "destructive"}
                        className="capitalize"
                      >
                        {log.action.replace("_", " ")}
                      </Badge>
                      {getStatusIcon(log.status)}
                    </div>
                    <p className="text-sm">{log.details}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>IP: {log.ip}</span>
                      <span>
                        {formatDistanceToNow(new Date(log.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
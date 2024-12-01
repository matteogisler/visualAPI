"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ErrorRate } from "./charts/error-rate";

const errorLogs = [
  {
    id: 1,
    workflow: "Payment Processing",
    error: "API Rate Limit Exceeded",
    timestamp: "2024-03-20T10:30:00Z",
    status: 429,
    details: "Too many requests to payment API",
  },
  {
    id: 2,
    workflow: "Order Fulfillment",
    error: "Invalid Authentication",
    timestamp: "2024-03-20T09:15:00Z",
    status: 401,
    details: "Invalid API key provided",
  },
  // Add more sample error logs
];

export function ErrorLogs() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");

  const filteredLogs = errorLogs.filter(
    (log) =>
      log.workflow.toLowerCase().includes(search.toLowerCase()) ||
      log.error.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Error Rate</CardTitle>
          <CardDescription>Error rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorRate />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search errors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-lg border bg-muted/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">
                        {log.status}
                      </Badge>
                      <span className="font-medium">{log.workflow}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(log.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="font-medium text-destructive mb-1">
                    {log.error}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {log.details}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
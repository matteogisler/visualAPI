"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  CircleDot,
  FileEdit,
  Settings,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "created",
    target: "Payment Processing Workflow",
    timestamp: "2024-03-20T10:30:00Z",
    type: "workflow",
    icon: FileEdit,
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "invited",
    target: "mike@example.com",
    timestamp: "2024-03-20T09:15:00Z",
    type: "member",
    icon: UserPlus,
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "updated",
    target: "Team Settings",
    timestamp: "2024-03-19T15:45:00Z",
    type: "settings",
    icon: Settings,
  },
  {
    id: 4,
    user: "John Doe",
    action: "shared",
    target: "Order Processing Workflow",
    timestamp: "2024-03-19T14:20:00Z",
    type: "workflow",
    icon: Share2,
  },
  {
    id: 5,
    user: "Jane Smith",
    action: "deleted",
    target: "Test Workflow",
    timestamp: "2024-03-19T11:10:00Z",
    type: "workflow",
    icon: Trash2,
  },
];

export function TeamActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Track your teams recent actions and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="relative">
            <div className="absolute left-2.5 top-3 w-px h-full bg-border" />

            <div className="space-y-8">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="relative pl-8">
                    <CircleDot className="absolute left-0 w-5 h-5 text-primary bg-background" />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">
                            {activity.target}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(activity.timestamp),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
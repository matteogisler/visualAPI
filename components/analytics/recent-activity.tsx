"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    workflow: "Payment Processing",
    status: "success",
    timestamp: "2024-03-20T10:30:00Z",
    duration: "245ms",
  },
  {
    id: 2,
    workflow: "Order Fulfillment",
    status: "error",
    timestamp: "2024-03-20T10:28:00Z",
    duration: "1.2s",
  },
  // Add more sample activities
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
          >
            {activity.status === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {activity.workflow}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {activity.duration}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
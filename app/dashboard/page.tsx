"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Blocks, Clock, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Workflows",
      value: "12",
      description: "Active workflows",
      icon: <Blocks className="w-4 h-4" />,
    },
    {
      title: "API Calls",
      value: "2,543",
      description: "Last 30 days",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      title: "Response Time",
      value: "234ms",
      description: "Average",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      title: "Team Members",
      value: "5",
      description: "Active users",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your API workflows
          </p>
        </div>
        <Button>Create New Workflow</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workflows</CardTitle>
            <CardDescription>Your recently modified workflows</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Recent workflows list will be implemented */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Performance</CardTitle>
            <CardDescription>Response times and success rates</CardDescription>
          </CardHeader>
          <CardContent>
            {/* API performance charts will be implemented */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
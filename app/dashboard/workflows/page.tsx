"use client";

import { Button } from "@/components/ui/button";
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
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const workflows = [
  {
    id: 1,
    name: "Stripe Payment Processing",
    description: "Process payments and update customer records",
    status: "active",
    lastModified: "2024-03-20",
  },
  {
    id: 2,
    name: "Slack Notifications",
    description: "Send automated notifications to Slack channels",
    status: "active",
    lastModified: "2024-03-19",
  },
  {
    id: 3,
    name: "Email Campaign",
    description: "Trigger email campaigns based on user actions",
    status: "draft",
    lastModified: "2024-03-18",
  },
];

export default function WorkflowsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Manage and monitor your API workflows
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/workflows/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Workflow
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search workflows..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{workflow.name}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/workflows/${workflow.id}`}>
                    Edit Workflow
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  Status:{" "}
                  <span
                    className={
                      workflow.status === "active"
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {workflow.status}
                  </span>
                </div>
                <div>Last modified: {workflow.lastModified}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { getWorkflows } from "@/lib/workflows/storage";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { WorkflowData } from "@/lib/workflows/types";

export default function WorkflowsPage() {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getWorkflows(user.uid)
      .then((w) => setWorkflows(w))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p>Loading…</p>;

  return (
    <div className="p-8">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage and monitor your API workflows</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/workflows/new">
            <Plus className="w-4 h-4 mr-2" /> Create Workflow
          </Link>
        </Button>
      </div>

      {/* search & filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search workflows…" className="pl-10" />
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

      {/* list */}
      <div className="grid gap-4">
        {workflows.map((wf) => (
          <Card key={wf.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{wf.name}</CardTitle>
                  <CardDescription>{wf.description}</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/workflows/${wf.id}`}>Edit Workflow</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  Status:{" "}
                  <span
                    className={
                      wf.status === "active"
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {wf.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateGallery } from "@/components/workflows/template-gallery";
import { saveWorkflow } from "@/lib/workflows/storage";
import { WorkflowData } from "@/lib/workflows/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewWorkflowPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkflow = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      const workflow: Partial<WorkflowData> = {
        name,
        description,
        nodes: [],
        edges: [],
        status: "draft",
      };

      const savedWorkflow = await saveWorkflow(workflow);
      router.push(`/dashboard/workflows/${savedWorkflow.id}`);
    } catch (error) {
      console.log("Failed to create workflow:", error);
      setIsCreating(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/workflows">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create New Workflow</h1>
        <p className="text-muted-foreground mb-8">
          Start from scratch or use a template
        </p>

        <Tabs defaultValue="blank" className="space-y-6">
          <TabsList>
            <TabsTrigger value="blank">Blank Workflow</TabsTrigger>
            <TabsTrigger value="template">Use Template</TabsTrigger>
          </TabsList>

          <TabsContent value="blank">
            <Card>
              <CardHeader>
                <CardTitle>Create Blank Workflow</CardTitle>
                <CardDescription>
                  Create a new workflow from scratch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateWorkflow} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Workflow Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter workflow name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your workflow"
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" disabled={isCreating}>
                    Create Workflow
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="template">
            <TemplateGallery onClose={() => router.push("/dashboard/workflows")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
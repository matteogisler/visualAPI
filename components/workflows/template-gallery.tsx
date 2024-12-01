"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Template, templates } from "@/lib/workflows/templates";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { saveWorkflow } from "@/lib/workflows/storage";
import { useRouter } from "next/navigation";

interface TemplateGalleryProps {
  onClose: () => void;
}

export function TemplateGallery({ onClose }: TemplateGalleryProps) {
  const router = useRouter();
  const categories = Array.from(
    new Set(templates.map((template) => template.category))
  );

  const handleUseTemplate = async (template: Template) => {
    try {
      const workflow = await saveWorkflow({
        ...template.workflow,
        id: undefined, // Create new ID
        name: `${template.name} Copy`,
      });
      router.push(`/dashboard/workflows/${workflow.id}`);
      onClose();
    } catch (error) {
      console.error("Failed to create workflow from template:", error);
    }
  };

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-6 space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {templates
                .filter((template) => template.category === category)
                .map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
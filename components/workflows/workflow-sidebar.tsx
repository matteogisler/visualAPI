"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Blocks, Webhook } from "lucide-react";

export function WorkflowSidebar() {
  const triggers = [
    {
      name: "Webhook",
      description: "Trigger workflow on HTTP request",
      icon: <Webhook className="w-4 h-4" />,
    },
    {
      name: "Schedule",
      description: "Run workflow at specified intervals",
      icon: <Blocks className="w-4 h-4" />,
    },
  ];

  const actions = [
    {
      name: "HTTP Request",
      description: "Make an HTTP request to any API",
      icon: <Blocks className="w-4 h-4" />,
    },
    {
      name: "Transform Data",
      description: "Modify data structure and format",
      icon: <Blocks className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-80 border-l bg-muted/10">
      <Tabs defaultValue="nodes" className="h-full flex flex-col">
        <div className="border-b p-4">
          <TabsList className="w-full">
            <TabsTrigger value="nodes" className="flex-1">
              Nodes
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="nodes" className="m-0">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Triggers</h3>
                <div className="space-y-2">
                  {triggers.map((trigger) => (
                    <Card
                      key={trigger.name}
                      className="cursor-grab active:cursor-grabbing"
                      draggable
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start gap-2">
                          {trigger.icon}
                          <div>
                            <CardTitle className="text-sm">
                              {trigger.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {trigger.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Actions</h3>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <Card
                      key={action.name}
                      className="cursor-grab active:cursor-grabbing"
                      draggable
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start gap-2">
                          {action.icon}
                          <div>
                            <CardTitle className="text-sm">
                              {action.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {action.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="m-0 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Settings</CardTitle>
                <CardDescription>
                  Configure workflow behavior and options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Workflow
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Workflow
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
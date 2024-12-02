"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiKeyList } from "@/components/auth/api-keys/api-key-list";
import { OAuthConnections } from "@/components/auth/oath/oath-connections";
import { AccessLogs } from "@/components/auth/access-logs";
import { SecuritySettings } from "@/components/auth/security-settings";


export default function AuthManagementPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Authentication</h1>
          <p className="text-muted-foreground">
            Manage API keys and authentication settings
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="oauth">OAuth</TabsTrigger>
          <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <ApiKeyList />
        </TabsContent>

        <TabsContent value="oauth">
          <OAuthConnections />
        </TabsContent>

        <TabsContent value="access-logs">
          <AccessLogs />
        </TabsContent>

        <TabsContent value="settings">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
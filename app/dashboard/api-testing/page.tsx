"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestBuilder } from "@/components/api-testing/request-builder";
import { ResponseViewer } from "@/components/api-testing/response-viewer";
import { EnvironmentManager } from "@/components/api-testing/environment-manager";
import { CollectionManager } from "@/components/api-testing/collection-manager";
import { Plus } from "lucide-react";
import { TestResult } from "@/lib/api-testing/types";

export default function ApiTestingPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTest = async (result: TestResult) => {
    setTestResult(result);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">API Testing</h1>
          <p className="text-muted-foreground">
            Test and debug your API endpoints
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Save Request
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-3">
          <CollectionManager />
        </div>

        <div className="col-span-9 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment</CardTitle>
              <CardDescription>
                Manage your environment variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnvironmentManager />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request</CardTitle>
                <CardDescription>Configure your API request</CardDescription>
              </CardHeader>
              <CardContent>
                <RequestBuilder onTest={handleTest} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>View API response details</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponseViewer result={testResult} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
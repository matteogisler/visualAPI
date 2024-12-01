"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageByEndpoint } from "./charts/usage-by-endpoint";
import { UsageByWorkflow } from "./charts/usage-by-workflow";
import { DataTransfer } from "./charts/data-transfer";


export function UsageStats() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageByEndpoint />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage by Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageByWorkflow />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Transfer</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTransfer />
        </CardContent>
      </Card>
    </div>
  );
}
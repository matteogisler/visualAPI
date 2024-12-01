"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponseTimes } from "./charts/response-times";
import { ThroughputChart } from "./charts/throughput";
import { LatencyDistribution } from "./charts/latency";

export function PerformanceMetrics() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimes />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <ThroughputChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latency Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <LatencyDistribution />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
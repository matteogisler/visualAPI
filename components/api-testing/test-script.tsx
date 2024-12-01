"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampleTest = `pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});`;

export function TestScript() {
  const [script, setScript] = useState(sampleTest);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Test Script</h3>
        <Button variant="outline" size="sm">
          Run Tests
        </Button>
      </div>

      <ScrollArea className="h-[300px] border rounded-md">
        <Textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="font-mono min-h-full border-0 rounded-none focus-visible:ring-0"
          placeholder="Write your test script here..."
        />
      </ScrollArea>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Save } from "lucide-react";

interface WorkflowHeaderProps {
  workflowId: string;
}

export function WorkflowHeader({ workflowId }: WorkflowHeaderProps) {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            defaultValue="My Workflow"
            className="text-lg font-semibold bg-transparent border-0 px-0 h-auto w-[200px] focus-visible:ring-0"
          />
          <Select defaultValue="draft">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
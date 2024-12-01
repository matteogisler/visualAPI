"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Environment } from "@/lib/api-testing/types";
import { Plus, Save, X } from "lucide-react";

export function EnvironmentManager() {
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: "dev",
      name: "Development",
      variables: {
        API_URL: "https://api.dev.example.com",
        API_KEY: "dev-key",
      },
      isActive: true,
    },
    {
      id: "prod",
      name: "Production",
      variables: {
        API_URL: "https://api.example.com",
        API_KEY: "prod-key",
      },
    },
  ]);

  const [selectedEnv, setSelectedEnv] = useState<string>("dev");
  const [newVariable, setNewVariable] = useState({ key: "", value: "" });

  const activeEnv = environments.find((env) => env.id === selectedEnv);

  const handleAddVariable = () => {
    if (!newVariable.key || !newVariable.value) return;

    setEnvironments((envs) =>
      envs.map((env) =>
        env.id === selectedEnv
          ? {
              ...env,
              variables: {
                ...env.variables,
                [newVariable.key]: newVariable.value,
              },
            }
          : env
      )
    );

    setNewVariable({ key: "", value: "" });
  };

  const handleRemoveVariable = (key: string) => {
    setEnvironments((envs) =>
      envs.map((env) => {
        if (env.id === selectedEnv) {
          const { [key]: _, ...rest } = env.variables;
          return { ...env, variables: rest };
        }
        return env;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={selectedEnv} onValueChange={setSelectedEnv}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select environment" />
          </SelectTrigger>
          <SelectContent>
            {environments.map((env) => (
              <SelectItem key={env.id} value={env.id}>
                {env.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          New Environment
        </Button>
      </div>

      {activeEnv && (
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,1fr,auto] gap-2 items-end">
            <Input
              placeholder="Variable name"
              value={newVariable.key}
              onChange={(e) =>
                setNewVariable({ ...newVariable, key: e.target.value })
              }
            />
            <Input
              placeholder="Value"
              value={newVariable.value}
              onChange={(e) =>
                setNewVariable({ ...newVariable, value: e.target.value })
              }
            />
            <Button onClick={handleAddVariable}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {Object.entries(activeEnv.variables).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[1fr,1fr,auto] gap-2 items-center"
              >
                <div className="font-mono text-sm">{key}</div>
                <div className="font-mono text-sm">{value}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveVariable(key)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
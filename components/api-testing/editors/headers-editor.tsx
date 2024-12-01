"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface HeadersEditorProps {
  headers: Record<string, string>;
  onChange: (headers: Record<string, string>) => void;
}

export function HeadersEditor({ headers, onChange }: HeadersEditorProps) {
  const [newHeader, setNewHeader] = useState({ key: "", value: "" });

  const handleAddHeader = () => {
    if (!newHeader.key || !newHeader.value) return;

    onChange({
      ...headers,
      [newHeader.key]: newHeader.value,
    });

    setNewHeader({ key: "", value: "" });
  };

  const handleRemoveHeader = (key: string) => {
    const { [key]: _, ...rest } = headers;
    onChange(rest);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr,1fr,auto] gap-2 items-end">
        <Input
          placeholder="Header name"
          value={newHeader.key}
          onChange={(e) => setNewHeader({ ...newHeader, key: e.target.value })}
        />
        <Input
          placeholder="Value"
          value={newHeader.value}
          onChange={(e) => setNewHeader({ ...newHeader, value: e.target.value })}
        />
        <Button onClick={handleAddHeader}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {Object.entries(headers).map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-[1fr,1fr,auto] gap-2 items-center"
          >
            <div className="font-mono text-sm">{key}</div>
            <div className="font-mono text-sm">{value}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveHeader(key)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
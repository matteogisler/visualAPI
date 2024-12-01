"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface JsonEditorProps {
  value: any;
  onChange: (value: any) => void;
}

export function JsonEditor({ value, onChange }: JsonEditorProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setText(JSON.stringify(value, null, 2));
    }
  }, [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    try {
      const parsed = JSON.parse(newText);
      onChange(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="font-mono min-h-[200px]"
        placeholder="Enter JSON data"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
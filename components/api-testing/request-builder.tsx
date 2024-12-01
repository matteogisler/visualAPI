"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TestResult } from "@/lib/api-testing/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeadersEditor } from "./editors/headers-editor";
import { JsonEditor } from "./editors/json-editor";
import { TestScript } from "./test-script";
import { Play } from "lucide-react";

const requestSchema = z.object({
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  headers: z.record(z.string()).optional(),
  body: z.any().optional(),
});

interface RequestBuilderProps {
  onTest: (result: TestResult) => void;
}

export function RequestBuilder({ onTest }: RequestBuilderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      url: "",
      method: "GET",
      headers: {},
      body: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof requestSchema>) => {
    setIsLoading(true);
    const startTime = performance.now();

    try {
      const response = await fetch(values.url, {
        method: values.method,
        headers: values.headers,
        body: values.method !== "GET" ? JSON.stringify(values.body) : undefined,
      });

      const data = await response.json();
      const endTime = performance.now();

      onTest({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
        duration: endTime - startTime,
        size: JSON.stringify(data).length,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      onTest({
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem className="w-32">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="https://api.example.com/endpoint"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            <Play className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>

        <Tabs defaultValue="headers">
          <TabsList>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="headers">
            <HeadersEditor
              headers={form.watch("headers") || {}}
              onChange={(headers) => form.setValue("headers", headers)}
            />
          </TabsContent>

          <TabsContent value="body">
            <JsonEditor
              value={form.watch("body")}
              onChange={(value) => form.setValue("body", value)}
            />
          </TabsContent>

          <TabsContent value="tests">
            <TestScript />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
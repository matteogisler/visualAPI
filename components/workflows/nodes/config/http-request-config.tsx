"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { NodeData } from "@/lib/workflows/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const httpRequestSchema = z.object({
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  headers: z.string().optional(),
  body: z.string().optional(),
});

interface HttpRequestConfigProps {
  node: NodeData;
  onUpdate: (nodeId: string, data: any) => void;
}

export function HttpRequestConfig({ node, onUpdate }: HttpRequestConfigProps) {
  const form = useForm<z.infer<typeof httpRequestSchema>>({
    resolver: zodResolver(httpRequestSchema),
    defaultValues: {
      url: node.data.url || "",
      method: node.data.method || "GET",
      headers: node.data.headers
        ? JSON.stringify(node.data.headers, null, 2)
        : "",
      body: node.data.body ? JSON.stringify(node.data.body, null, 2) : "",
    },
  });

  const onSubmit = (values: z.infer<typeof httpRequestSchema>) => {
    const data = {
      ...values,
      headers: values.headers ? JSON.parse(values.headers) : {},
      body: values.body ? JSON.parse(values.body) : {},
    };
    onUpdate(node.id, {
      ...node.data,
      ...data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://api.example.com/endpoint" {...field} />
              </FormControl>
              <FormDescription>The API endpoint URL</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HTTP Method</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select HTTP method" />
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
          name="headers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headers (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
}'
                  className="font-mono"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Body (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{
  "key": "value"
}'
                  className="font-mono"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
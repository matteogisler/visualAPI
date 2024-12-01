"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiEndpoint, ApiParameter } from "@/lib/api-docs/types";
import { Badge } from "../ui/badge";

interface RequestPanelProps {
  endpoint: ApiEndpoint;
}

export function RequestPanel({ endpoint }: RequestPanelProps) {
  return (
    <div className="space-y-6">
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Parameters</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoint.parameters.map((param: ApiParameter) => (
                <TableRow key={`${param.in}-${param.name}`}>
                  <TableCell className="font-mono">{param.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{param.in}</Badge>
                  </TableCell>
                  <TableCell>{param.schema.type}</TableCell>
                  <TableCell>
                    {param.required ? (
                      <Badge>Required</Badge>
                    ) : (
                      <Badge variant="secondary">Optional</Badge>
                    )}
                  </TableCell>
                  <TableCell>{param.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {endpoint.requestBody && (
        <div>
          <h3 className="text-sm font-medium mb-2">Request Body</h3>
          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              {JSON.stringify(
                Object.values(endpoint.requestBody.content)[0].schema,
                null,
                2
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
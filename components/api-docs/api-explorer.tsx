"use client";

import { useState } from "react";
import { ApiDocument, ApiEndpoint } from "@/lib/api-docs/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { EndpointCard } from "./endpoint-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApiExplorerProps {
  apiDoc: ApiDocument;
  onEndpointSelect: (endpoint: ApiEndpoint) => void;
}

export function ApiExplorer({ apiDoc, onEndpointSelect }: ApiExplorerProps) {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("all");

  const filteredEndpoints = Object.entries(apiDoc.paths).flatMap(([path, methods]) =>
    Object.entries(methods).map(([method, endpoint]) => ({
      ...endpoint,
      path,
      method: method.toUpperCase(),
    }))
  ).filter(endpoint => {
    const matchesSearch = 
      endpoint.path.toLowerCase().includes(search.toLowerCase()) ||
      endpoint.summary.toLowerCase().includes(search.toLowerCase());
    
    const matchesMethod = 
      methodFilter === "all" || endpoint.method.toLowerCase() === methodFilter.toLowerCase();
    
    return matchesSearch && matchesMethod;
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{apiDoc.title}</CardTitle>
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search endpoints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="get">GET</SelectItem>
              <SelectItem value="post">POST</SelectItem>
              <SelectItem value="put">PUT</SelectItem>
              <SelectItem value="delete">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {filteredEndpoints.map((endpoint) => (
              <EndpointCard
                key={`${endpoint.method}-${endpoint.path}`}
                endpoint={endpoint}
                onClick={() => onEndpointSelect(endpoint)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
"use client";

export interface ApiEndpoint {
  path: string;
  method: string;
  summary: string;
  description?: string;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: Record<string, ApiResponse>;
}

export interface ApiParameter {
  name: string;
  in: "query" | "path" | "header" | "cookie";
  description?: string;
  required: boolean;
  schema: ApiSchema;
}

export interface ApiRequestBody {
  description?: string;
  required: boolean;
  content: Record<string, { schema: ApiSchema }>;
}

export interface ApiResponse {
  description: string;
  content?: Record<string, { schema: ApiSchema }>;
}

export interface ApiSchema {
  type: string;
  format?: string;
  properties?: Record<string, ApiSchema>;
  items?: ApiSchema;
  required?: string[];
  enum?: string[];
  example?: any;
}

export interface ApiDocument {
  id: string;
  title: string;
  description?: string;
  version: string;
  servers: { url: string }[];
  paths: Record<string, Record<string, ApiEndpoint>>;
}
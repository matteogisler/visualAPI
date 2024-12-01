"use client";

import { ApiDocument, ApiEndpoint } from "./types";

export function parseOpenApiDocument(spec: any): ApiDocument {
  return {
    id: crypto.randomUUID(),
    title: spec.info.title,
    description: spec.info.description,
    version: spec.info.version,
    servers: spec.servers || [{ url: "/" }],
    paths: Object.entries(spec.paths).reduce((acc, [path, methods]: [string, any]) => {
      acc[path] = Object.entries(methods).reduce((methodAcc, [method, endpoint]: [string, any]) => {
        if (method === "parameters") return methodAcc;
        
        methodAcc[method] = {
          path,
          method: method.toUpperCase(),
          summary: endpoint.summary || "",
          description: endpoint.description,
          parameters: endpoint.parameters,
          requestBody: endpoint.requestBody,
          responses: endpoint.responses,
        };
        
        return methodAcc;
      }, {} as Record<string, ApiEndpoint>);
      
      return acc;
    }, {} as Record<string, Record<string, ApiEndpoint>>),
  };
}

export function parsePostmanCollection(collection: any): ApiDocument {
  const endpoints: Record<string, Record<string, ApiEndpoint>> = {};

  collection.item.forEach((item: any) => {
    const request = item.request;
    const path = new URL(request.url.raw).pathname;
    
    if (!endpoints[path]) {
      endpoints[path] = {};
    }

    endpoints[path][request.method.toLowerCase()] = {
      path,
      method: request.method,
      summary: item.name,
      description: request.description,
      parameters: request.url.query?.map((q: any) => ({
        name: q.key,
        in: "query",
        required: !q.disabled,
        schema: { type: "string" },
      })),
      requestBody: request.body ? {
        description: "Request body",
        required: true,
        content: {
          [request.body.mode === "raw" ? "application/json" : "application/x-www-form-urlencoded"]: {
            schema: {
              type: "object",
              example: request.body.raw ? JSON.parse(request.body.raw) : {},
            },
          },
        },
      } : undefined,
      responses: {
        "200": {
          description: "Successful response",
        },
      },
    };
  });

  return {
    id: crypto.randomUUID(),
    title: collection.info.name,
    description: collection.info.description,
    version: "1.0.0",
    servers: [{ url: "/" }],
    paths: endpoints,
  };
}
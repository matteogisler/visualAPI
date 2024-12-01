"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RequestCollection, SavedRequest } from "@/lib/api-testing/types";
import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";

export function CollectionManager() {
  const [collections, setCollections] = useState<RequestCollection[]>([
    {
      id: "1",
      name: "Authentication",
      requests: [
        {
          id: "1-1",
          name: "Login",
          method: "POST",
          url: "/api/auth/login",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "1-2",
          name: "Refresh Token",
          method: "POST",
          url: "/api/auth/refresh",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  return (
    <div className="h-full border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Collections</h3>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Input placeholder="Search requests..." className="w-full" />
      </div>

      <ScrollArea className="h-[calc(100vh-13rem)]">
        <div className="p-4">
          <Accordion type="multiple" className="w-full">
            {collections.map((collection) => (
              <AccordionItem key={collection.id} value={collection.id}>
                <AccordionTrigger className="text-sm">
                  {collection.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-1">
                    {collection.requests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                      >
                        <div
                          className={`px-2 py-0.5 rounded text-xs font-medium
                            ${
                              request.method === "GET"
                                ? "bg-blue-100 text-blue-800"
                                : request.method === "POST"
                                ? "bg-green-100 text-green-800"
                                : request.method === "PUT"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {request.method}
                        </div>
                        <span className="flex-1">{request.name}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
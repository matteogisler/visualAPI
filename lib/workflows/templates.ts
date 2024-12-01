"use client";

import { WorkflowData } from "./types";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  workflow: WorkflowData;
}

export const templates: Template[] = [
  {
    id: "webhook-to-slack",
    name: "Webhook to Slack",
    description: "Send webhook payload to a Slack channel",
    category: "Communication",
    workflow: {
      id: "webhook-to-slack",
      name: "Webhook to Slack",
      description: "Send webhook payload to a Slack channel",
      status: "draft",
      nodes: [
        {
          id: "webhook",
          type: "webhook",
          data: {
            label: "Webhook Trigger",
            method: "POST",
            path: "/webhook",
          },
          position: { x: 250, y: 100 },
        },
        {
          id: "slack",
          type: "httpRequest",
          data: {
            label: "Send to Slack",
            url: "https://hooks.slack.com/services/YOUR_WEBHOOK_URL",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              text: "New webhook received: ${webhook.body}",
            },
          },
          position: { x: 250, y: 250 },
        },
      ],
      edges: [
        {
          id: "webhook-to-slack",
          source: "webhook",
          target: "slack",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "github-to-discord",
    name: "GitHub to Discord",
    description: "Send GitHub webhook events to Discord",
    category: "Development",
    workflow: {
      id: "github-to-discord",
      name: "GitHub to Discord",
      description: "Send GitHub webhook events to Discord",
      status: "draft",
      nodes: [
        {
          id: "webhook",
          type: "webhook",
          data: {
            label: "GitHub Webhook",
            method: "POST",
            path: "/github-webhook",
          },
          position: { x: 250, y: 100 },
        },
        {
          id: "discord",
          type: "httpRequest",
          data: {
            label: "Send to Discord",
            url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              content: "New GitHub event: ${webhook.body}",
            },
          },
          position: { x: 250, y: 250 },
        },
      ],
      edges: [
        {
          id: "github-to-discord",
          source: "webhook",
          target: "discord",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];
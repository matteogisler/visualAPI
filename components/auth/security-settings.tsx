"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function SecuritySettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>API Security</CardTitle>
          <CardDescription>
            Configure API authentication and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Limit the number of API requests per minute
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
            <Input
              id="rate-limit"
              type="number"
              defaultValue="60"
              className="max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>IP Restrictions</CardTitle>
          <CardDescription>
            Control access to your API based on IP addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">
                Only allow access from specific IP addresses
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip-whitelist">Allowed IP Addresses</Label>
            <Textarea
              id="ip-whitelist"
              placeholder="Enter IP addresses (one per line)"
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Enter one IP address or CIDR range per line
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Settings</CardTitle>
          <CardDescription>
            Configure API token behavior and expiration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Token Expiration</Label>
              <p className="text-sm text-muted-foreground">
                Automatically expire API tokens after a set period
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token-expiration">
              Token Expiration (in days)
            </Label>
            <Input
              id="token-expiration"
              type="number"
              defaultValue="30"
              className="max-w-[200px]"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
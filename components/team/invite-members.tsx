"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Invitation {
  email: string;
  role: string;
}

export function InviteMembers() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newInvite, setNewInvite] = useState<Invitation>({
    email: "",
    role: "viewer",
  });

  const handleAddInvitation = () => {
    if (!newInvite.email) return;
    setInvitations([...invitations, newInvite]);
    setNewInvite({ email: "", role: "viewer" });
  };

  const handleRemoveInvitation = (email: string) => {
    setInvitations(invitations.filter((inv) => inv.email !== email));
  };

  const handleSendInvitations = () => {
    // TODO: Implement sending invitations
    console.log("Sending invitations:", invitations);
    setInvitations([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Members</CardTitle>
        <CardDescription>
          Invite new members to join your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,200px,auto] gap-4 items-end">
            <Input
              placeholder="Email address"
              type="email"
              value={newInvite.email}
              onChange={(e) =>
                setNewInvite({ ...newInvite, email: e.target.value })
              }
            />
            <Select
              value={newInvite.role}
              onValueChange={(role) => setNewInvite({ ...newInvite, role })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddInvitation}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {invitations.length > 0 && (
            <div className="space-y-2">
              {invitations.map((invitation) => (
                <div
                  key={invitation.email}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div>{invitation.email}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {invitation.role}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveInvitation(invitation.email)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                className="w-full mt-4"
                onClick={handleSendInvitations}
              >
                Send Invitations
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
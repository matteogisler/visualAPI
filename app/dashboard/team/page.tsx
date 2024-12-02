"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TeamMembers } from "@/components/team/team-members";
import { InviteMembers } from "@/components/team/invite-members";
import { TeamActivity } from "@/components/team/team-activity";
import { TeamSettings } from "@/components/team/team-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus } from "lucide-react";
import { InviteMemberDialog } from "@/components/team/invite-team-member-dialog";

export default function TeamPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your team and collaborators
          </p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="grid gap-6">
            <TeamMembers />
            <InviteMembers />
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <TeamActivity />
        </TabsContent>

        <TabsContent value="settings">
          <TeamSettings />
        </TabsContent>
      </Tabs>

      <InviteMemberDialog
        open={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
      />
    </div>
  );
}
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
  joinedAt: string;
  status: "active" | "pending" | "inactive";
}

export interface TeamActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: "workflow" | "member" | "settings";
  icon: any;
}

export interface TeamSettings {
  id: string;
  name: string;
  description?: string;
  timezone: string;
  permissions: {
    allowWorkflowSharing: boolean;
    publicApiDocs: boolean;
    requireApproval: boolean;
  };
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  invitedBy: string;
  invitedAt: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: string;
}
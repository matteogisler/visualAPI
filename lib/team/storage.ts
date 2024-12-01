"use client";

import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { TeamMember, TeamSettings, TeamInvitation } from "./types";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const membersRef = collection(db, "teams", user.uid, "members");
  const snapshot = await getDocs(membersRef);
  return snapshot.docs.map(doc => doc.data() as TeamMember);
}

export async function inviteTeamMember(email: string, role: TeamMember["role"]): Promise<TeamInvitation> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const invitation: TeamInvitation = {
    id: crypto.randomUUID(),
    email,
    role,
    invitedBy: user.uid,
    invitedAt: new Date().toISOString(),
    status: "pending",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };

  const invitationRef = doc(
    collection(db, "teams", user.uid, "invitations"),
    invitation.id
  );
  
  await setDoc(invitationRef, invitation);
  return invitation;
}

export async function getTeamSettings(): Promise<TeamSettings> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const settingsRef = doc(collection(db, "teams"), user.uid);
  const settingsDoc = await getDoc(settingsRef);
  
  if (!settingsDoc.exists()) {
    throw new Error("Team settings not found");
  }

  return settingsDoc.data() as TeamSettings;
}

export async function updateTeamSettings(settings: Partial<TeamSettings>): Promise<TeamSettings> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const settingsRef = doc(collection(db, "teams"), user.uid);
  const updatedSettings = {
    ...(await getTeamSettings()),
    ...settings,
  };
  
  await setDoc(settingsRef, updatedSettings);
  return updatedSettings;
}

export async function removeTeamMember(memberId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const memberRef = doc(collection(db, "teams", user.uid, "members"), memberId);
  await deleteDoc(memberRef);
}
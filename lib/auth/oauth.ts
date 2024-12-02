"use client";

import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export interface OAuthConnection {
  id: string;
  service: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export async function connectOAuth(
  service: string,
  config: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string;
  }
): Promise<OAuthConnection> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const connection: OAuthConnection = {
    id: crypto.randomUUID(),
    service,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
    scopes: config.scopes.split(" "),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const connectionRef = doc(
    collection(db, "users", user.uid, "oauth_connections"),
    connection.id
  );
  
  await setDoc(connectionRef, connection);
  return connection;
}

export async function disconnectOAuth(connectionId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const connectionRef = doc(
    collection(db, "users", user.uid, "oauth_connections"),
    connectionId
  );
  
  await deleteDoc(connectionRef);
}

export async function getOAuthConnections(): Promise<OAuthConnection[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const connectionsRef = collection(db, "users", user.uid, "oauth_connections");
  const snapshot = await getDocs(connectionsRef);
  return snapshot.docs.map(doc => doc.data() as OAuthConnection);
}

export async function refreshOAuthToken(connectionId: string): Promise<void> {
  // Implement token refresh logic here
  // This would typically involve making a request to the OAuth provider's token endpoint
  // using the refresh token to obtain a new access token
}
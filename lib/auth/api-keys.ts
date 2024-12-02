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
  updateDoc,
} from "firebase/firestore";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: "development" | "production";
  status: "active" | "inactive" | "revoked";
  expiresAt?: string;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createApiKey(data: {
  name: string;
  type: "development" | "production";
  expiresAt?: string;
}): Promise<ApiKey> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const prefix = data.type === "production" ? "pk_live_" : "pk_test_";
  const key = `${prefix}${crypto.randomUUID().replace(/-/g, "")}`;

  const apiKey: ApiKey = {
    id: crypto.randomUUID(),
    name: data.name,
    key,
    type: data.type,
    status: "active",
    expiresAt: data.expiresAt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const keyRef = doc(
    collection(db, "users", user.uid, "api_keys"),
    apiKey.id
  );
  
  await setDoc(keyRef, apiKey);
  return apiKey;
}

export async function getApiKeys(): Promise<ApiKey[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const keysRef = collection(db, "users", user.uid, "api_keys");
  const snapshot = await getDocs(keysRef);
  return snapshot.docs.map(doc => doc.data() as ApiKey);
}

export async function revokeApiKey(keyId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const keyRef = doc(collection(db, "users", user.uid, "api_keys"), keyId);
  await updateDoc(keyRef, {
    status: "revoked",
    updatedAt: new Date().toISOString(),
  });
}

export async function regenerateApiKey(keyId: string): Promise<ApiKey> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const keyRef = doc(collection(db, "users", user.uid, "api_keys"), keyId);
  const keyDoc = await getDocs(query(collection(db, "users", user.uid, "api_keys"), where("id", "==", keyId)));
  
  if (keyDoc.empty) {
    throw new Error("API key not found");
  }

  const existingKey = keyDoc.docs[0].data() as ApiKey;
  const prefix = existingKey.type === "production" ? "pk_live_" : "pk_test_";
  const newKey = `${prefix}${crypto.randomUUID().replace(/-/g, "")}`;

  const updatedKey: ApiKey = {
    ...existingKey,
    key: newKey,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(keyRef, updatedKey);
  return updatedKey;
}

export async function updateApiKeyName(keyId: string, name: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const keyRef = doc(collection(db, "users", user.uid, "api_keys"), keyId);
  await updateDoc(keyRef, {
    name,
    updatedAt: new Date().toISOString(),
  });
}
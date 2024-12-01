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

export interface Credential {
  id: string;
  name: string;
  type: "apiKey" | "oauth2" | "basic";
  service?: string;
  headers: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export async function saveCredential(credential: Omit<Credential, "id" | "createdAt" | "updatedAt">) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const newCredential: Credential = {
    ...credential,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const credentialRef = doc(
    collection(db, "users", user.uid, "credentials"),
    newCredential.id
  );
  
  await setDoc(credentialRef, newCredential);
  return newCredential;
}

export async function getCredentials(service?: string): Promise<Credential[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const credentialsRef = collection(db, "users", user.uid, "credentials");
  const q = service
    ? query(credentialsRef, where("service", "==", service))
    : credentialsRef;

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Credential);
}

export async function deleteCredential(credentialId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const credentialRef = doc(
    collection(db, "users", user.uid, "credentials"),
    credentialId
  );
  
  await deleteDoc(credentialRef);
}
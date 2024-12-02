"use client";

import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";

export interface AccessLog {
  id: string;
  type: "api_key" | "oauth" | "authentication";
  action: string;
  status: "success" | "failed";
  details: string;
  ip: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export async function logAccess(data: Omit<AccessLog, "id" | "timestamp">): Promise<AccessLog> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const log: AccessLog = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  const logRef = doc(
    collection(db, "users", user.uid, "access_logs"),
    log.id
  );
  
  await setDoc(logRef, log);
  return log;
}

export async function getAccessLogs(options?: {
  type?: AccessLog["type"];
  status?: AccessLog["status"];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  lastLogId?: string;
}): Promise<AccessLog[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  let q = collection(db, "users", user.uid, "access_logs");
  const constraints: any[] = [];

  if (options?.type) {
    constraints.push(where("type", "==", options.type));
  }

  if (options?.status) {
    constraints.push(where("status", "==", options.status));
  }

  if (options?.startDate) {
    constraints.push(where("timestamp", ">=", options.startDate.toISOString()));
  }

  if (options?.endDate) {
    constraints.push(where("timestamp", "<=", options.endDate.toISOString()));
  }

  constraints.push(orderBy("timestamp", "desc"));

  if (options?.limit) {
    constraints.push(limit(options.limit));
  }

  if (options?.lastLogId) {
    const lastLog = await getDocs(
      query(q, where("id", "==", options.lastLogId))
    );
    if (!lastLog.empty) {
      constraints.push(startAfter(lastLog.docs[0]));
    }
  }

  const snapshot = await getDocs(query(q, ...constraints));
  return snapshot.docs.map(doc => doc.data() as AccessLog);
}

export async function exportAccessLogs(options?: {
  type?: AccessLog["type"];
  status?: AccessLog["status"];
  startDate?: Date;
  endDate?: Date;
}): Promise<string> {
  const logs = await getAccessLogs(options);
  
  const csv = [
    ["Timestamp", "Type", "Action", "Status", "Details", "IP", "User Agent"].join(","),
    ...logs.map(log => [
      log.timestamp,
      log.type,
      log.action,
      log.status,
      `"${log.details.replace(/"/g, '""')}"`,
      log.ip,
      log.userAgent || "",
    ].join(","))
  ].join("\n");

  return csv;
}
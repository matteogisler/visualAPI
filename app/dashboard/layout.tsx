"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
      <ProtectedRoute>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      </ProtectedRoute>
    </div>
  );
}
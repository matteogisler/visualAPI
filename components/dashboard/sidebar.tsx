"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  Blocks,
  Home,
  Key,
  LayoutDashboard,
  LogOut,
  Settings,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    title: "Workflows",
    icon: <Workflow className="w-5 h-5" />,
    href: "/dashboard/workflows",
  },
  {
    title: "API Testing",
    icon: <Blocks className="w-5 h-5" />,
    href: "/dashboard/api-testing",
  },
  {
    title: "Authentication",
    icon: <Key className="w-5 h-5" />,
    href: "/dashboard/auth-management",
  },
  {
    title: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen w-56 border-r bg-muted/10">
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Blocks className="w-5 h-5" />
          <span className="text-sm font-semibold">Visual API Builder</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="w-full justify-start gap-2 text-sm px-2 py-2"
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sm px-2 py-2"
          onClick={async () => {
            await signOut(auth);
            router.push("/login");
          }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );  
}
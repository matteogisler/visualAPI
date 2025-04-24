"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Blocks } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Blocks className="w-6 h-6" />
            <span className="font-semibold">Visual API Builder</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthForm mode="login" />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Dont have an account?{" "}
              <Button variant="link" className="p-0" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
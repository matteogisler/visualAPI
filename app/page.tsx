"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Blocks, Gauge, Key, Workflow } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Visual Workflow Builder",
      description: "Create API workflows with an intuitive drag-and-drop interface",
      icon: <Workflow className="w-10 h-10 text-primary" />,
    },
    {
      title: "API Testing Environment",
      description: "Test your API integrations in real-time with instant feedback",
      icon: <Blocks className="w-10 h-10 text-primary" />,
    },
    {
      title: "Secure Authentication",
      description: "Manage API keys and tokens with enterprise-grade security",
      icon: <Key className="w-10 h-10 text-primary" />,
    },
    {
      title: "Advanced Analytics",
      description: "Monitor API performance and track usage metrics",
      icon: <Gauge className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Blocks className="w-8 h-8" />
            <span className="text-xl font-bold">Visual API Builder</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build API Workflows{" "}
              <span className="text-primary">Without Code</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create, test, and monitor API integrations with our intuitive
              drag-and-drop interface. Perfect for teams of any size.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need for API Integration
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-sm border"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Streamline Your API Integration?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are building faster with Visual API
              Builder.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Building for Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Blocks className="w-6 h-6" />
              <span className="font-semibold">Visual API Builder</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Visual API Builder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
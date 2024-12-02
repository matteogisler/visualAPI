"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Blocks, Clock, Users } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    workflows: 0,
    apiCalls: 0,
    responseTime: "0ms",
    teamMembers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total workflows
        const workflowsSnapshot = await getDocs(collection(db, "workflows"));
        const totalWorkflows = workflowsSnapshot.size;

        // Fetch API calls (assuming each document is an API call)
        const apiCallsSnapshot = await getDocs(collection(db, "api_calls"));
        const totalApiCalls = apiCallsSnapshot.size;

        // Fetch team members (assuming each document is a team member)
        const teamMembersSnapshot = await getDocs(collection(db, "team_members"));
        const totalTeamMembers = teamMembersSnapshot.size;

        // Set stats state
        setStats({
          workflows: totalWorkflows,
          apiCalls: totalApiCalls,
          responseTime: "234ms",
          teamMembers: totalTeamMembers,
        });
      } catch (error) {
        console.error("Error fetching stats: ", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your API workflows
          </p>
        </div>
        <Button>Create New Workflow</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Blocks className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.workflows}</div>
            <p className="text-xs text-muted-foreground">Active workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <BarChart3 className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.apiCalls}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responseTime}</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workflows</CardTitle>
            <CardDescription>Your recently modified workflows</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Recent workflows list will be implemented */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Performance</CardTitle>
            <CardDescription>Response times and success rates</CardDescription>
          </CardHeader>
          <CardContent>
            {/* API performance charts will be implemented */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2024-03-14", rate: 0.8 },
  { date: "2024-03-15", rate: 1.2 },
  { date: "2024-03-16", rate: 0.9 },
  { date: "2024-03-17", rate: 0.5 },
  { date: "2024-03-18", rate: 0.7 },
  { date: "2024-03-19", rate: 1.1 },
  { date: "2024-03-20", rate: 0.6 },
];

export function ErrorRate() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Error Rate"]}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
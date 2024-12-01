"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2024-03-14", executions: 145 },
  { date: "2024-03-15", executions: 232 },
  { date: "2024-03-16", executions: 186 },
  { date: "2024-03-17", executions: 192 },
  { date: "2024-03-18", executions: 256 },
  { date: "2024-03-19", executions: 278 },
  { date: "2024-03-20", executions: 234 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="executions"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
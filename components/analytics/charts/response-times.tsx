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
  { time: "00:00", p50: 120, p90: 180, p99: 250 },
  { time: "04:00", p50: 130, p90: 190, p99: 260 },
  { time: "08:00", p50: 180, p90: 240, p99: 320 },
  { time: "12:00", p50: 190, p90: 250, p99: 330 },
  { time: "16:00", p50: 170, p90: 230, p99: 310 },
  { time: "20:00", p50: 150, p90: 210, p99: 290 },
];

export function ResponseTimes() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
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
          tickFormatter={(value) => `${value}ms`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="p50"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="p90"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="p99"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
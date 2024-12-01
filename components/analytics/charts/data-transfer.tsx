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
  { date: "2024-03-14", incoming: 245, outgoing: 132 },
  { date: "2024-03-15", incoming: 388, outgoing: 221 },
  { date: "2024-03-16", incoming: 312, outgoing: 165 },
  { date: "2024-03-17", incoming: 425, outgoing: 254 },
  { date: "2024-03-18", incoming: 516, outgoing: 298 },
  { date: "2024-03-19", incoming: 448, outgoing: 234 },
  { date: "2024-03-20", incoming: 502, outgoing: 341 },
];

export function DataTransfer() {
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
          tickFormatter={(value) => `${value}KB`}
        />
        <Tooltip formatter={(value: number) => `${value}KB`} />
        <Area
          type="monotone"
          dataKey="incoming"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="outgoing"
          stackId="1"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
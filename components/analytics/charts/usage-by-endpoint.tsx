"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { endpoint: "/api/auth", calls: 3450 },
  { endpoint: "/api/users", calls: 2840 },
  { endpoint: "/api/orders", calls: 2100 },
  { endpoint: "/api/products", calls: 1750 },
  { endpoint: "/api/payments", calls: 1200 },
];

export function UsageByEndpoint() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          dataKey="endpoint" 
          type="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip />
        <Bar
          dataKey="calls"
          fill="hsl(var(--chart-1))"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
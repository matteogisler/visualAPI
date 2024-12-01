"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "Payment Processing", value: 35 },
  { name: "User Authentication", value: 25 },
  { name: "Data Sync", value: 20 },
  { name: "Email Service", value: 15 },
  { name: "Analytics", value: 5 },
];

export function UsageByWorkflow() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => `${entry.name} (${entry.value}%)`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`hsl(var(--chart-${index + 1}))`}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => `${value}%`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
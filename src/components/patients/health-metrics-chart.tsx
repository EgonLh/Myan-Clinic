"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const healthData = [
  { date: "Dec 1", heartRate: 68, bloodPressure: 120, weight: 165 },
  { date: "Dec 2", heartRate: 72, bloodPressure: 118, weight: 164.8 },
  { date: "Dec 3", heartRate: 70, bloodPressure: 122, weight: 165.2 },
  { date: "Dec 4", heartRate: 74, bloodPressure: 119, weight: 164.5 },
  { date: "Dec 5", heartRate: 69, bloodPressure: 121, weight: 164.9 },
  { date: "Dec 6", heartRate: 73, bloodPressure: 117, weight: 164.7 },
  { date: "Dec 7", heartRate: 71, bloodPressure: 120, weight: 165.1 },
]

export function HealthMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics Trend</CardTitle>
        <CardDescription>Your vital signs over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs fill-muted-foreground" axisLine={false} tickLine={false} />
              <YAxis className="text-xs fill-muted-foreground" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="heartRate"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="bloodPressure"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

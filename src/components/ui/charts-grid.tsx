"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Sample data for charts
const trafficData = [
  { time: "00:00", users: 1200, sessions: 1800 },
  { time: "04:00", users: 800, sessions: 1200 },
  { time: "08:00", users: 2400, sessions: 3200 },
  { time: "12:00", users: 3200, sessions: 4100 },
  { time: "16:00", users: 2800, sessions: 3600 },
  { time: "20:00", users: 2000, sessions: 2800 },
]

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 55000 },
  { month: "Mar", revenue: 48000, target: 52000 },
  { month: "Apr", revenue: 61000, target: 58000 },
  { month: "May", revenue: 55000, target: 60000 },
  { month: "Jun", revenue: 67000, target: 65000 },
]

const deviceData = [
  { device: "Desktop", users: 12500, percentage: 45 },
  { device: "Mobile", users: 18200, percentage: 65 },
  { device: "Tablet", users: 3400, percentage: 12 },
]

const performanceData = [
  { time: "00:00", responseTime: 120, errorRate: 0.2 },
  { time: "04:00", responseTime: 95, errorRate: 0.1 },
  { time: "08:00", responseTime: 180, errorRate: 0.8 },
  { time: "12:00", responseTime: 220, errorRate: 1.2 },
  { time: "16:00", responseTime: 160, errorRate: 0.6 },
  { time: "20:00", responseTime: 140, errorRate: 0.4 },
]

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Traffic Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Traffic Overview</CardTitle>
          <CardDescription className="text-muted-foreground">
            User sessions and unique visitors over the last 24 hours. The peak at 12:00 indicates lunch-time browsing
            patterns, while the dip at 04:00 shows typical low-activity hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Users",
                color: "hsl(var(--chart-1))",
              },
              sessions: {
                label: "Sessions",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stackId="1"
                  stroke="var(--color-sessions)"
                  fill="var(--color-sessions)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stackId="1"
                  stroke="var(--color-users)"
                  fill="var(--color-users)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Revenue Performance */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Revenue Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Monthly revenue vs targets. April shows strong performance exceeding targets by 5%, while May fell short.
            June's recovery indicates successful optimization efforts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-3))",
              },
              target: {
                label: "Target",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device Usage */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Device Usage</CardTitle>
          <CardDescription className="text-muted-foreground">
            Mobile dominates with 65% of traffic, reflecting the mobile-first user behavior. Desktop maintains strong
            presence at 45%, while tablet usage remains minimal at 12%.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Users",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="device" type="category" stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">System Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Response times correlate with traffic patterns, peaking during high-usage hours. Error rates remain low
            overall but spike during peak times, suggesting capacity optimization opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              responseTime: {
                label: "Response Time (ms)",
                color: "hsl(var(--chart-5))",
              },
              errorRate: {
                label: "Error Rate (%)",
                color: "hsl(var(--destructive))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="responseTime"
                  stroke="var(--color-responseTime)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-responseTime)" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="errorRate"
                  stroke="var(--color-errorRate)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-errorRate)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

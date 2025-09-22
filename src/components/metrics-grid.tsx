"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Users, Activity, DollarSign, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Total Users",
    value: "24,891",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Active users in the last 24 hours",
  },
  {
    title: "Page Views",
    value: "156,432",
    change: "+8.2%",
    trend: "up",
    icon: Activity,
    description: "Total page views across all pages",
  },
  {
    title: "Revenue",
    value: "$89,432",
    change: "-2.1%",
    trend: "down",
    icon: DollarSign,
    description: "Revenue generated in the current period",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
    description: "Percentage of visitors who converted",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={metric.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center text-xs mt-1">
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={isPositive ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="text-muted-foreground ml-1">from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

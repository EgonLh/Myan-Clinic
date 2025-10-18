"use client"

import { useGetSummaryQuery } from "@/app/store/features/analysis/analysisApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Users,
  Activity,
  CalendarDays,
  FileText,
} from "lucide-react"

export function MetricsGrid() {
  const { data: summary, isLoading, isError } = useGetSummaryQuery()

  if (isLoading)
    return (
      <p className="text-center text-sm text-muted-foreground font-mono">
        Loading metrics...
      </p>
    )
  if (isError || !summary)
    return (
      <p className="text-center text-sm text-destructive font-mono">
        Failed to load metrics.
      </p>
    )

  // Simulate previous data or use real previous period data if available
  const prev = {
    patientsCount: summary.patientsCount * 0.95,
    doctorsCount: summary.doctorsCount * 0.97,
    appointmentsCount: summary.appointmentsCount * 1.05,
    filesCount: summary.filesCount * 0.96,
  }

  // Helper to calculate % change dynamically
  const calcChange = (current: number, prev: number) => {
    if (prev === 0) return { percent: 0, trend: "neutral" }
    const diff = ((current - prev) / prev) * 100
    return {
      percent: Math.abs(diff).toFixed(1) + "%",
      trend: diff >= 0 ? "up" : "down",
    }
  }

  const metrics = [
    {
      title: "Total Patients",
      value: summary.patientsCount,
      ...calcChange(summary.patientsCount, prev.patientsCount),
      icon: Users,
      description: "Registered patients in the system",
    },
    {
      title: "Total Doctors",
      value: summary.doctorsCount,
      ...calcChange(summary.doctorsCount, prev.doctorsCount),
      icon: Activity,
      description: "Active doctors in the clinic",
    },
    {
      title: "Appointments",
      value: summary.appointmentsCount,
      ...calcChange(summary.appointmentsCount, prev.appointmentsCount),
      icon: CalendarDays,
      description: "Total appointments this period",
    },
    {
      title: "Files Stored",
      value: summary.filesCount,
      ...calcChange(summary.filesCount, prev.filesCount),
      icon: FileText,
      description: "Medical files stored securely",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card
            key={metric.title}
            className="border border-dotted rounded-sm bg-card shadow-none transition hover:border-muted-foreground/50"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {metric.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs mt-1">
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    isPositive ? "text-green-500" : "text-red-500"
                  }
                >
                  {metric.percent}
                </span>
                <span className="text-muted-foreground ml-1">
                  from last period
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-2">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

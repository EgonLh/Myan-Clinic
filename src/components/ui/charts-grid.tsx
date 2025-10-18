"use client"

import * as React from "react"
import {
  useGetDoctorsByDepartmentQuery,
  useGetAppointmentsPerDoctorQuery,
} from "@/app/store/features/analysis/analysisApi"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"

export function ChartsGrid() {
  const { data: doctorsByDept, isLoading: loadingDoctors } = useGetDoctorsByDepartmentQuery()
  const { data: appointmentsPerDoctor, isLoading: loadingAppointments } =
    useGetAppointmentsPerDoctorQuery()

  if (loadingDoctors || loadingAppointments) {
    return (
      <div className="flex justify-center items-center h-[200px] text-muted-foreground font-mono">
        Loading charts...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 font-mono">
      {/* 🩺 Doctors by Department — Vertical Bar Chart */}
      <Card className="bg-card border-dotted border-border shadow-none transition-all">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            Doctors by Department
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Visual count of doctors across departments.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          {doctorsByDept && doctorsByDept.length > 0 ? (
            <ChartContainer
              className="h-[250px] sm:h-[300px] md:h-[360px] w-full"
              config={{
                count: { label: "Doctors", color: "hsl(var(--chart-1))" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={doctorsByDept}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="department"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 6 }}
                    interval={0}
                    angle={0}
                    textAnchor="middle"
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                    width={30}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                    barSize={70}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No department data available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 📊 Appointments per Doctor — Horizontal Bar Chart */}
      <Card className="bg-card border-dotted border-border shadow-none transition-all">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            Appointments per Doctor
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Appointment volume comparison across doctors.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          {appointmentsPerDoctor && appointmentsPerDoctor.length > 0 ? (
            <ChartContainer
              className="h-[250px] sm:h-[300px] md:h-[360px] w-full"
              config={{
                appointmentsCount: {
                  label: "Appointments",
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentsPerDoctor}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="doctorName"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                    width={100}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="appointmentsCount"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 4, 4]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No appointment data available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

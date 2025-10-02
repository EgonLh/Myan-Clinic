"use client"

import {
  useGetAppointmentsPerDoctorQuery,
  useGetDoctorsByDepartmentQuery,
  useGetPatientsGrowthQuery,
} from "@/app/store/features/analysis/analysisApi"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import {
  AreaChart,
  BarChart,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Bar,
  Line,
} from "recharts"

export function ChartsGrid() {
  const { data: patientsGrowth, isLoading: loadingPatients } = useGetPatientsGrowthQuery()
  const { data: doctorsByDept, isLoading: loadingDoctors } = useGetDoctorsByDepartmentQuery()
  const { data: appointmentsPerDoctor, isLoading: loadingAppointments } = useGetAppointmentsPerDoctorQuery()

  if (loadingPatients || loadingDoctors || loadingAppointments) return <p>Loading charts...</p>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Patients Growth */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Patients Growth</CardTitle>
          <CardDescription>Monthly new patient registrations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[300px]"
            config={{ count: { label: "Patients", color: "hsl(var(--chart-1))" } }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientsGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="count" stroke="var(--color-users)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Doctors by Department */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Doctors by Department</CardTitle>
          <CardDescription>Number of doctors in each department.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[300px]"
            config={{ count: { label: "Doctors", color: "hsl(var(--chart-2))" } }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorsByDept} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="department" type="category" stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-users)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Appointments per Doctor */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Appointments per Doctor</CardTitle>
          <CardDescription>Number of appointments handled by each doctor.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[300px]"
            config={{ appointmentsCount: { label: "Appointments", color: "hsl(var(--chart-3))" } }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentsPerDoctor}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="doctorName" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="appointmentsCount" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

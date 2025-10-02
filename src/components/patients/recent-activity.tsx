"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, FileText, Calendar, Pill, Heart } from "lucide-react"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"

interface RecentActivityProps {
  patientId: number | undefined
}

export function RecentActivity({ patientId }: RecentActivityProps) {
  // Fetch appointments for this patient
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)

  // Transform appointments to activity format (only "done" status)
  const appointmentActivities = appointments
    ?.filter((appt) => (appt.status).toLocaleLowerCase() === "done")
    .map((appt) => ({
      id: appt.id,
      type: "appointment",
      title: "Appointment completed",
      description: `Dr. ${appt.doctor?.user?.name} - ${appt.description ?? "No description"}`,
      time: new Date(appt.date).toLocaleString(),
      icon: Calendar,
      status: "done",
    })) ?? []

  console.log(appointments )
  const activities = [...appointmentActivities]

  if (isLoading) return <p>Loading activities...</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

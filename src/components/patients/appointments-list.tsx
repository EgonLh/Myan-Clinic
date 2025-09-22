"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Smith",
    specialty: "Cardiology",
    date: "Dec 15, 2024",
    time: "2:00 PM",
    type: "In-person",
    location: "Medical Center - Room 205",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Johnson",
    specialty: "General Medicine",
    date: "Dec 22, 2024",
    time: "10:00 AM",
    type: "Video call",
    location: "Virtual appointment",
    status: "confirmed",
  },
  {
    id: 3,
    doctor: "Dr. Emily Davis",
    specialty: "Dermatology",
    date: "Jan 5, 2025",
    time: "3:30 PM",
    type: "In-person",
    location: "Dermatology Clinic - Room 102",
    status: "pending",
  },
]

export function AppointmentsList() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Your Appointments
          </CardTitle>
          <CardDescription>Manage your upcoming medical appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <Badge variant="outline">{appointment.specialty}</Badge>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {appointment.type === "Video call" ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        {appointment.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">{appointment.type === "Video call" ? "Join Call" : "View Details"}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button className="w-full md:w-auto">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

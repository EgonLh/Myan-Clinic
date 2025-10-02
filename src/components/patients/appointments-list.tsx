"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Plus } from "lucide-react"
import { useGetAppointmentsByPatientQuery, useCreateAppointmentMutation } from "@/app/store/features/appointment/appointmentApi"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface AppointmentsListProps {
  patientId: number
}

export function AppointmentsList({ patientId }: AppointmentsListProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)
  const [createAppointment] = useCreateAppointmentMutation()

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [appointmentType, setAppointmentType] = useState<"Video call" | "In-person">("In-person")
  const [doctorName, setDoctorName] = useState("")

  if (isLoading) return <p>Loading appointments...</p>
  if (!appointments) return <p className="text-muted-foreground">No appointments found.</p>

  const handleCreateAppointment = async () => {
    if (!selectedDate || !doctorName) return alert("Please fill all fields")

    try {
      await createAppointment({
        patientId,
        doctorId: 1, // Hardcoded for now; in real app, select from doctor list
        date: selectedDate.toISOString(),
        type: appointmentType,
        status: "pending",
      })
      setOpenDialog(false)
      setSelectedDate(null)
      setDoctorName("")
      alert("Appointment scheduled successfully")
    } catch (err) {
      console.error(err)
      alert("Failed to schedule appointment")
    }
  }

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
            {appointments.map((appointment) => {
              const isVideo = appointment.type?.toLowerCase() === "video call"
              const appointmentDate = new Date(appointment.date).toLocaleDateString()
              const appointmentTime = new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

              return (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{appointment.doctor?.user?.name ?? "Unknown Doctor"}</h3>
                          <Badge variant="outline">{appointment.doctor?.type ?? "General"}</Badge>
                          <Badge variant={appointment.status === "done" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointmentDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointmentTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {isVideo ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          {appointment.type === "Video call" ? "Virtual Appointment" : "In-person Appointment"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">{isVideo ? "Join Call" : "View Details"}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-6">
            <Button className="w-full md:w-auto flex items-center gap-2" onClick={() => setOpenDialog(true)}>
              <Plus className="w-4 h-4" />
              Schedule New Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Appointment Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Schedule New Appointment</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Doctor Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Dr. Smith"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Date & Time</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Appointment Type</label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value as any)}
                className="w-full border p-2 rounded"
              >
                <option value="In-person">In-person</option>
                <option value="Video call">Video call</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateAppointment}>Schedule</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Plus, FileUp } from "lucide-react"
import {
  useGetAppointmentsByPatientQuery,
  useUploadInvoiceByAppointmentIdMutation,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from "@/app/store/features/appointment/appointmentApi"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface AppointmentsListProps {
  patientId: number
}

export function AppointmentsList({ patientId }: AppointmentsListProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)
  const [createAppointment] = useCreateAppointmentMutation()
  const [uploadInvoice] = useUploadInvoiceByAppointmentIdMutation()
  const  [updateStatus] = useUpdateAppointmentMutation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [appointmentType, setAppointmentType] = useState<"Video call" | "In-person">("In-person")
  const [doctorName, setDoctorName] = useState("")
  const [detailDialog, setDetailDialog] = useState<any | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // --- Filters ---
  const [filterDoctor, setFilterDoctor] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  if (isLoading) return <p>Loading appointments...</p>
  if (!appointments) return <p className="text-muted-foreground">No appointments found.</p>

  // --- Sorted and Filtered Appointments ---
  const sortedAppointments = useMemo(() => {
    return [...appointments]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter((a) =>
        (filterDoctor === "All" || a.doctor?.user?.name === filterDoctor) &&
        (filterStatus === "All" || a.status === filterStatus)
      )
  }, [appointments, filterDoctor, filterStatus])

  const uniqueDoctors = Array.from(new Set(appointments.map(a => a.doctor?.user?.name).filter(Boolean)))
  const uniqueStatuses = Array.from(new Set(appointments.map(a => a.status)))



  // --- Upload invoice for selected appointment ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }
  const pendingObj = {
    status: "Pending" as "Pending"
  }
  const handleUploadInvoice = async () => {
    if (!selectedFile || !detailDialog) return
    try {
      await updateStatus({ id: Number(detailDialog.id), body: pendingObj })
      await uploadInvoice({ id: Number(detailDialog.id), file: selectedFile }).unwrap()
      alert("Invoice uploaded successfully")
      setSelectedFile(null)
      setDetailDialog(null)
    } catch (err) {
      console.error(err)
      alert("Failed to upload invoice")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-sm shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Your Appointments
          </CardTitle>
          <CardDescription>Manage your upcoming medical appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- Filters --- */}
          <div className="flex flex-col md:flex-row gap-3 mb-4 text-sm">
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="border p-2 font-mono text-xs rounded"
            >
              <option value="All">All Doctors</option>
              {uniqueDoctors.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 font-mono  text-xs rounded"
            >
              <option value="All">All Status</option>
              {uniqueStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

          </div>

          {/* --- Appointment Cards --- */}
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {sortedAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date).toLocaleDateString()
              const appointmentTime = new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

              return (
                <Card key={appointment.id} className=" transition-shadow shadow-none  rounded-sm">
                  <CardContent className="">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
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
                          {appointment.notes}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setDetailDialog(appointment)}>View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>


        </CardContent>
      </Card>



      {/* --- Detail Dialog --- */}
      {detailDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Appointment Details</h2>
            <p><strong>Doctor:</strong> {detailDialog.doctor?.user?.name}</p>
            <p><strong>Date:</strong> {new Date(detailDialog.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {detailDialog.status}</p>
            <p><strong>Type:</strong> {detailDialog.type}</p>
            <p><strong>Cost:</strong> {detailDialog.costs ?? "N/A"} MMK</p>

            {!detailDialog.invoice && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Upload Invoice</label>
                <input type="file" accept=".pdf,.png" onChange={handleFileChange} className="text-xs" />
                <Button
                  className="mt-2 flex items-center gap-1"
                  onClick={handleUploadInvoice}
                  disabled={!selectedFile}
                >
                  <FileUp className="w-4 h-4" /> Upload
                </Button>
              </div>
            )}

            {detailDialog.invoice && (
              <p className="text-sm text-green-600">Invoice already uploaded ✅</p>
            )}

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setDetailDialog(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

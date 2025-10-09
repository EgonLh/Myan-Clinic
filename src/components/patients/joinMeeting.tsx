"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import {
  useGetAppointmentsByPatientQuery,
  useUpdateAppointmentMutation,
  useUploadInvoiceByAppointmentIdMutation,
} from "@/app/store/features/appointment/appointmentApi"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AppointmentQRCode } from "./appointmetnQr"

interface JoinNowProps {
  patientId: number | undefined
}

export function JoinMeeting({ patientId }: JoinNowProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(Number(patientId))
  const  [updateStatus] = useUpdateAppointmentMutation();
  const [uploadInvoice] = useUploadInvoiceByAppointmentIdMutation();
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  if (isLoading) return <p className="font-mono text-sm">Loading appointments...</p>
  if (!appointments || appointments.length === 0) return <p className="font-mono text-sm">No upcoming appointments</p>

  const upcomingAppointments = appointments
    .filter((appt) => new Date(appt.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const nextAppointment = upcomingAppointments[0]
  if (!nextAppointment) return <p className="font-mono text-sm">No upcoming appointments</p>

  const appointmentTime = new Date(nextAppointment.date).toLocaleString()

  const handleMeeting = () => {
    if (nextAppointment.meetingLink) {
      router.push(nextAppointment.meetingLink)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
const pendingObj = {
      status: "Pending" as "Pending"
    }
  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadInvoice({ id: Number(nextAppointment.id), file }).unwrap();
      await updateStatus({ id: Number(nextAppointment.id),body:pendingObj})
      alert("Invoice uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload invoice");
    }
  };
  console.log("the data:", nextAppointment)

  return (
    <Card className="p-4 m-0 shadow-none font-mono border border-slate-200 rounded-sm">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" />
          Appointment Invoice
        </CardTitle>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Payment:</span>
          <span>Paid via KBZ Pay (Ref: #INV-10234)</span>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-2 border-t-3 border-dashed text-sm">
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Doctor:</span>
          <span>Dr. {nextAppointment.doctor?.user?.name}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Patient:</span>
          <span>{nextAppointment.patient?.user?.name}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Duration:</span>
          <span>{nextAppointment.duration} hr</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Scheduled At:</span>
          <span>{appointmentTime}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Status:</span>
          <span>{nextAppointment.status}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Notes:</span>
          <span>{nextAppointment?.notes}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Description:</span>
          <span> {nextAppointment?.description}</span>
        </div>

        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Total Cost:</span>
          <span>{nextAppointment.costs} MMK</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Payment Status:</span>
          {(nextAppointment.status).toLocaleLowerCase() != "not_started" ? <span className="text-green-600">Completed</span> : <span className="text-green-600">-</span>}
        </div>
        {/* Conditionally show Join button only if invoice exists */}
        {nextAppointment.invoice ? (
          // Invoice exists
          nextAppointment.status.toLowerCase() === "confirmed" && (<div>
            <Button
              as="a"
              onClick={handleMeeting}
              target="_blank"
              variant="outline"
              className="w-full mt-3 font-mono shadow-none"
            >
              Join Appointment
            </Button>
            <AppointmentQRCode appointment={nextAppointment} />
          </div>

          )
        ) : (
          // No invoice yet
          <div className="flex flex-col gap-2 mt-3">
            <input
              type="file"
              accept=".pdf,.png"
              onChange={handleFileChange}
              className="text-xs"
            />
            <Button
              onClick={handleUpload}
              disabled={!file}
              variant="outline"
              className="w-full font-mono"
            >
              Upload Invoice
            </Button>
          </div>
        )}


        {nextAppointment.status.toLowerCase() !== "confirmed" && (
          <p className="text-xs text-center text-muted-foreground mt-3 font-mono">
            Appointment not confirmed yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}

"use client"
// ----- Join Meeting Component ----- //
// - Review [x]
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
import { Checkbox } from "../ui/checkbox"

interface JoinNowProps {
  patientId: number | undefined
}

export function JoinMeeting({ patientId }: JoinNowProps) {
  // ----- fetch appointments ----- //
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(Number(patientId))
  const [updateStatus] = useUpdateAppointmentMutation()
  const [uploadInvoice] = useUploadInvoiceByAppointmentIdMutation()
  const [file, setFile] = useState<File | null>(null)
  const [checkLogic, setCheckLogic] = useState(false);
  const router = useRouter()

  // ----- loading / empty states ----- //
  if (isLoading) return <p className="font-mono text-sm">Loading appointments...</p>
  if (!appointments || appointments.length === 0)
    return <p className="font-mono text-sm">No upcoming appointments</p>

  // -----  get next upcoming appointment ----- //
const upcomingAppointments = appointments
  .filter(
    (appt) =>
      new Date(appt.date) >= new Date() &&
      !["done", "cancelled"].includes(appt.status.toLowerCase())
  )
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  const nextAppointment = upcomingAppointments[0]
  if (!nextAppointment) return <p className="font-mono text-sm">No upcoming appointments</p>

  // ----- format appointment time conditionally ----- //
  let appointmentTime: string
  if (nextAppointment.notes?.toLowerCase().includes("diagnosis")) {
    // only show date if notes contain "Diagnosis"
    appointmentTime = new Date(nextAppointment.date).toLocaleDateString()
  } else {
    // show date + time otherwise
    appointmentTime = new Date(nextAppointment.date).toLocaleString()
  }

  // ----- status objects ----- //
  const DoneObj = { status: "Done" as "Done" }
  const pendingObj = { status: "Pending" as "Pending" }

  console.log("Next Appointment:", nextAppointment)
  // -----  handle join meeting click ----- //
  const handleMeeting = async () => {
    try {
      await updateStatus({ id: Number(nextAppointment.id), body: DoneObj })
    } catch (error) {
      console.error("Error updating status to Done:", error)
    }
    if (nextAppointment.meetingLink) {
      router.push(nextAppointment.meetingLink)
    }
  }

  // -----  handle file selection ----- //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0])
  }

  // ----- handle invoice upload ----- //
  const handleUpload = async () => {
    if (!file) return
    try {
      await uploadInvoice({ id: Number(nextAppointment.id), file }).unwrap()
      await updateStatus({ id: Number(nextAppointment.id), body: pendingObj })
      alert("Invoice uploaded successfully")
    } catch (err) {
      console.error(err)
      alert("Failed to upload invoice")
    }
  }

  // -----  render appointment card ----- //
  return (
    <Card className="p-4 m-0 shadow-none font-mono border border-slate-200 rounded-sm">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" /> Appointment Invoice
        </CardTitle>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Payment:</span>
          <span>Paid via KBZ Pay (Ref: #INV-10234)</span>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-2 border-t-3 border-dashed text-sm">
        {/* -----  appointment details ----- */}
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
          <span>{nextAppointment?.description}</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Total Cost:</span>
          <span>{nextAppointment.costs} MMK</span>
        </div>
        <div className="flex justify-between my-2 text-xs border-slate-200 pb-1">
          <span className="text-muted-foreground">Payment Status:</span>
          {nextAppointment.status.toLowerCase() == "confirmed" ? (
            <span className="text-green-600">Completed</span>
          ) : (
            <span className="text-green-600">-</span>
          )}
        </div>

        {/* -----  conditional Join / Upload buttons ----- */}
        {nextAppointment.invoice ? (
          nextAppointment.status.toLowerCase() === "confirmed" && (
            <div>
              <Button
                as="a"
                onClick={handleMeeting}
                target="_blank"
                variant="outline"
                className="w-full mt-3 font-mono shadow-none"
                disabled={!checkLogic}
              >
                Join Appointment
              </Button>
              <div className="text-[10px] flex   justify-center  w-full  text-center mt-2 text-slate-400">
                <Checkbox
                  checked={checkLogic}
                  onCheckedChange={(checked) => setCheckLogic(!!checked)}
                  className=" shadow-none w-[15px] h-[15px] pb-0.5 me-1"
                />Join at appointment time (will update status)
              </div>
              <AppointmentQRCode appointment={nextAppointment} />
              <div className="text-xs text-center mt-1 text-slate-400">
                Take QR For Physical Appointment!
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2 mt-3">
            <input type="file" accept=".pdf,.png" onChange={handleFileChange} className="text-xs" />
            <Button onClick={handleUpload} disabled={!file} variant="outline" className="w-full font-mono">
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

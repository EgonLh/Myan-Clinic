"use client"

import { use, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Activity, Pill, FileText, ChevronRight, CheckCircle2, Clock1, AlarmClockPlus, Router, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/patients/navbar"
import { HealthMetricsChart } from "@/components/patients/health-metrics-chart"
import { JoinMeeting } from "@/components/patients/joinMeeting"
import { MedicationTracker } from "@/components/patients/medication-tracker"
import { MedicineIdentifier } from "@/components/patients/medicine-identifier"
import { AppointmentsList } from "@/components/patients/appointments-list"
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"
import { MedicalRecords } from "@/components/patients/medical-record"
import LoadingPills from "@/components/ui/loading"
import { useRouter } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CreateAppointment from "../doctor/create-appointment/page"
import CreateAppointmentByPatient from "@/components/patients/create-appointments"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useSelector((state: RootState) => state.auth)
  const patientId = Number(user?.user_id)
  const router = useRouter();
  console.log("user :", user)
  if (!user) return <div> <LoadingPills message="Data is Loading" />  </div>
  // Fetch patient's appointments and storage
  const { data: appointments = [] } = useGetAppointmentsByPatientQuery(Number(patientId))
  const { data: storages = [] } = useGetStorageByPatientQuery(Number(patientId))

  // Next upcoming appointment
  const nextAppointment = appointments
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]



  const AppointmentConfirmed = appointments.filter(a => (a.status)?.toLowerCase() == "pending");
  // console.log("Need confirmation :",AppointmentConfirmed)
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-9">
              {/* Next Appointment */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 m-0 space-y-1">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">
                      {nextAppointment ? new Date(nextAppointment.date).toLocaleDateString() : "-"}
                    </p>
                  </div>

                  {/* Title */}
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Next Appointment
                  </p>
                  <hr className="mt-1" />

                  {/* Extra Info */}
                  <div className="text-[10px] text-muted-foreground font-mono space-y-[2px]">
                    {nextAppointment ? (
                      <>
                        <p>{nextAppointment.doctor.user?.name} - {nextAppointment.doctor?.type}</p>
                        <p>{new Date(nextAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </>
                    ) : (
                      <p>No upcoming appointments</p>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80" onClick={() => setActiveTab("appointments")}>
                    View details
                  </p>
                </CardContent>
              </Card>
              {/* Total Appointments */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 m-0 space-y-1">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <AlarmClockPlus className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">{appointments.length}</p>
                  </div>

                  {/* Title */}
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Total Appointments
                  </p>
                  <hr className="mt-1" />

                  {/* Extra Info */}
                  <div className="text-[10px] text-muted-foreground font-mono space-y-[2px]">
                    <p>All scheduled visits Record By The System</p>
                    <p>Click Appointments Tabs for full list</p>
                  </div>
                  <p className="text-[10px] text-slate-300  font-medium underline cursor-pointer hover:text-primary/80" onClick={() => setActiveTab("appointments")}>
                    View details
                  </p>
                </CardContent>



              </Card>



              {/* Storage Items */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 m-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">{storages.length}</p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Storage Items
                  </p>
                  <hr className="mt-1" />

                  <div className="text-[10px] text-muted-foreground font-mono space-y-[2px]">
                    {storages.length > 0 ? (
                      storages.map((s) => (
                        <p key={s.id}>({s.files.length} files)</p>
                      ))
                    ) : (
                      <p>No stored items</p>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80" onClick={() => setActiveTab("appointments")}>
                    View details
                  </p>

                </CardContent>
              </Card>

              {/* Health Score / Payment Info */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 m-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <Activity className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">
                      {AppointmentConfirmed.length}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Payment Confirmation
                  </p>
                  <hr className="mt-1" />

                  <div className="text-[10px] text-muted-foreground text-justify font-mono space-y-[2px]">
                    <p>Appoints Need To Confirm With Your Payment Invoices by uploading your payment. After comfirming , the appointment status will be changed</p>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80" onClick={() => setActiveTab("appointments")}>
                    View details
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Health Metrics & Recent Activity */}
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-none rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Accordion type="single" collapsible className="w-full space-y-2">
                      {appointments
                        .filter((appt) => new Date(appt.date) >= new Date())
                        .map((appt) => (
                          <AccordionItem key={appt.id} value={`appt-${appt.id}`} className=" ">
                            <AccordionTrigger className="flex justify-between items-center p-3">
                              <div>
                                <p className="font-medium">{appt?.doctor?.user?.name}</p>
                                <p className="text-sm text-muted-foreground">{new Date(appt.date).toLocaleString()}</p>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-3 bg-muted/50 rounded-sm space-y-1 text-[13px] text-muted-foreground">
                              <p><span className="font-semibold">Department:</span> {appt?.doctor?.department?.name}</p>
                              <p><span className="font-semibold">Duration:</span> {appt?.duration} hr</p>
                              <p><span className="font-semibold">Patient:</span> {appt?.patient?.user?.name}</p>
                              <p><span className="font-semibold">Status:</span> {appt?.status}</p>
                              <p><span className="font-semibold">Notes:</span> {appt?.notes || "N/A"}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="flex justify-end mt-12">
                      <Button variant="outline" className="w-fit bg-transparent mt-2" onClick={() => setActiveTab("appointments")}>
                        View All Appointments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div><JoinMeeting patientId={patientId} /></div>
            </div>

          </div>
        )
      case "actions":
        return <CreateAppointmentByPatient/>
      case "appointments":
        return <AppointmentsList patientId={patientId} />
      case "medicine-identifier":
        return <MedicineIdentifier />
      case "records":
        return <MedicalRecords patientId={patientId} />
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">This section is coming soon!</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-600 text-balance">Welcome back, </h2>
              <p className="text-muted-foreground font-mono text-xs"> Here's a quick summary of your health activity, {user?.email}.</p>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}

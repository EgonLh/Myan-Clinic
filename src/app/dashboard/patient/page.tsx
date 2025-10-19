"use client"
// ----- Main Patient Page ----- //
// - Review [x]
import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "@/app/store/store"

// ----- UI Components ----- //
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import LoadingPills from "@/components/ui/loading"

// ----- Icons ----- //
import {
  Calendar,
  Activity,
  FileText,
  AlarmClockPlus,
} from "lucide-react"

// ----- Patient Components ----- //
import { Navbar } from "@/components/patients/navbar"
import { JoinMeeting } from "@/components/patients/joinMeeting"
import { MedicineIdentifier } from "@/components/patients/medicine-identifier"
import { AppointmentsList } from "@/components/patients/appointments-list"
import { MedicalRecords } from "@/components/patients/medical-record"
import CreateAppointmentByPatient from "@/components/patients/create-appointments"
import { PatientStorage } from "@/components/patients/patient-storage"

// ----- RTK Query API Hooks ----- //
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"
import { UserDialog } from "@/components/patients/patient-edit"

export default function PatientDashboard() {
  // ----- STATE & HOOKS ----- //
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useSelector((state: RootState) => state.auth)
  const patientId = Number(user?.user_id)
  const router = useRouter()

  // ----- DATA FETCHING ----- //
  if (!user) return <div><LoadingPills message="Data is Loading" /></div>

  const { data: appointments = [] } = useGetAppointmentsByPatientQuery(patientId)
  const { data: storages = [] } = useGetStorageByPatientQuery(patientId)

  //----- CALCULATIONS  ----- //

  // Find the next upcoming appointment (sorted by soonest date)
  const nextAppointment = appointments
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  // Appointments needing payment confirmation
  const AppointmentConfirmed = appointments.filter(a => (a.status)?.toLowerCase() === "pending")

  // ----- RENDERING CONTENT  ----- //
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            {/* ----- QUICK STATS ----- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-9">

              {/* ----- Next Appointment ----- */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">
                      {nextAppointment ? new Date(nextAppointment.date).toLocaleDateString() : "-"}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">Next Appointment</p>
                  <hr className="mt-1" />

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

                  <p
                    className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80"
                    onClick={() => setActiveTab("appointments")}
                  >
                    View details
                  </p>
                </CardContent>
              </Card>

              {/* ----- Total Appointments ----- */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <AlarmClockPlus className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">{appointments.length}</p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">Total Appointments</p>
                  <hr className="mt-1" />

                  <div className="text-[10px] text-muted-foreground font-mono space-y-[2px]">
                    <p>All scheduled visits recorded by the system</p>
                    <p>Click “Appointments” tab for full list</p>
                  </div>

                  <p
                    className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80"
                    onClick={() => setActiveTab("appointments")}
                  >
                    View details
                  </p>
                </CardContent>
              </Card>

              {/* ----- Storage Items ----- */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">{storages.length}</p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">Storage Items</p>
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

                  <p
                    className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80"
                    onClick={() => setActiveTab("storage")}
                  >
                    View details
                  </p>
                </CardContent>
              </Card>

              {/* ----- Payment Confirmation ----- */}
              <Card className="rounded-sm p-3 m-0 shadow-none hover:bg-slate-300/[0.1] transition-all duration-300">
                <CardContent className="p-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-black rounded p-1 text-white">
                      <Activity className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold border rounded-lg p-1 px-2">{AppointmentConfirmed.length}</p>
                  </div>

                  <p className="text-xs font-medium text-muted-foreground mt-1">Payment Confirmation</p>
                  <hr className="mt-1" />

                  <div className="text-[10px] text-muted-foreground font-mono text-justify space-y-[2px]">
                    <p>Appointments need payment confirmation via invoice upload. Once confirmed, status will update automatically.</p>
                  </div>

                  <p
                    className="text-[10px] text-slate-300 font-medium underline cursor-pointer hover:text-primary/80"
                    onClick={() => setActiveTab("appointments")}
                  >
                    View details
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ----- Upcoming Appointments + Join Meeting ----- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments Accordion */}
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
                          <AccordionItem key={appt.id} value={`appt-${appt.id}`}>
                            <AccordionTrigger className="flex justify-between items-center p-3">
                              <div>
                                <p className="font-medium">{appt?.doctor?.user?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(appt.date).toLocaleString()}
                                </p>
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

                    {/* View All Button */}
                    <div className="flex justify-end mt-12">
                      <Button
                        variant="outline"
                        className="w-fit bg-transparent mt-2"
                        onClick={() => setActiveTab("appointments")}
                      >
                        View All Appointments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Video Call / Join Meeting */}
              <div>
                <JoinMeeting patientId={patientId} />
              </div>
            </div>
          </div>
        )

      // ----- Additional Tabs ----- //
      case "actions":
        return <CreateAppointmentByPatient />
      case "appointments":
        return <AppointmentsList patientId={patientId} />
      case "medicine-identifier":
        return <MedicineIdentifier />
      case "records":
        return <MedicalRecords patientId={patientId} />
      case "storage":
        return <PatientStorage patientId={patientId} />
      // ----- Default Placeholder -----
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

  // ----- MAIN RENDER ----- // 
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-600">
                Welcome back,
              </h2>
              <p className="text-muted-foreground font-mono text-xs">
                Here's a quick summary and services we provide for your health , {user?.email}.
              </p>
              <UserDialog
                userId={user?.id || 0}
                trigger={<Button variant="outline">Edit User</Button>}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </main>
    </div>
  )
}

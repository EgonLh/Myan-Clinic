"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Activity, Pill, FileText, ChevronRight, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/patients/navbar"
import { HealthMetricsChart } from "@/components/patients/health-metrics-chart"
import { RecentActivity } from "@/components/patients/recent-activity"
import { MedicationTracker } from "@/components/patients/medication-tracker"
import { MedicineIdentifier } from "@/components/patients/medicine-identifier"
import { AppointmentsList } from "@/components/patients/appointments-list"
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"
import { MedicalRecords } from "@/components/patients/medical-record"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useSelector((state: RootState) => state.auth)
  const patientId = user?.user_id

  // Fetch patient's appointments and storage
  const { data: appointments = [] } = useGetAppointmentsByPatientQuery(patientId!)
  const { data: storages = [] } = useGetStorageByPatientQuery(patientId!)

  // Next upcoming appointment
  const nextAppointment = appointments
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  console.log("data",appointments)
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Appointments */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                      <p className="text-2xl font-bold">{appointments.length}</p>
                      <p className="text-xs text-muted-foreground">All scheduled visits</p>
                    </div>
                    <Activity className="w-8 h-8 text-chart-1" />
                  </div>
                </CardContent>
              </Card>

              {/* Next Appointment */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
                      {nextAppointment ? (
                        <>
                          <p className="text-2xl font-bold">{new Date(nextAppointment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">{nextAppointment.doctor} - {nextAppointment.department}</p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                      )}
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Medications / Storage Info */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-muted-foreground">Storage Items</p>
                    {storages.length > 0 ? (
                      storages.map((s) => (
                        <p key={s.id} className="text-sm">
                           ({s.files.length} files)
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No stored items</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Health Score */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Add Payment Info</p>
                      <p className="text-2xl font-bold">85<span className="text-sm font-normal">/100</span></p>
                      <p className="text-xs text-accent">Excellent</p>
                    </div>
                    <Activity className="w-8 h-8 text-chart-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Metrics & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"> <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appointments.slice(0, 2).map((appt) => (
                    <div key={appt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{appt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appt.department}</p>
                        <p className="text-sm text-muted-foreground">{new Date(appt.date).toLocaleString()}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">View All Appointments</Button>
                </CardContent>
              </Card></div>
              <div><RecentActivity patientId={patientId} /></div>
            </div>

          </div>
        )
      case "appointments":
        return <AppointmentsList patientId={patientId} />
      case "medicine-identifier":
        return <MedicineIdentifier />
      case "records":
        return <MedicalRecords patientId={patientId}/>
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
              <h2 className="text-2xl font-bold text-balance">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground">Here's your health overview for today</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                All systems normal
              </Badge>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}

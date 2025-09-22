"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Activity, Pill, FileText, ChevronRight, CheckCircle2 } from "lucide-react"
import { HealthMetricsChart } from "@/components/patients/health-metrics-chart"
import { AppointmentsList } from "@/components/patients/appointments-list"
import { MedicationTracker } from "@/components/patients/medication-tracker"
import { RecentActivity } from "@/components/patients/recent-activity"
import { MedicineIdentifier } from "@/components/patients/medicine-identifier"
import { Navbar } from "@/components/patients/navbar" // Replaced sidebar with navbar

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
                      <p className="text-2xl font-bold">Dec 15</p>
                      <p className="text-xs text-muted-foreground">Dr. Smith - Cardiology</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                      <p className="text-2xl font-bold">
                        72 <span className="text-sm font-normal">bpm</span>
                      </p>
                      <p className="text-xs text-accent">Normal range</p>
                    </div>
                    <Heart className="w-8 h-8 text-chart-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Medications</p>
                      <p className="text-2xl font-bold">
                        3 <span className="text-sm font-normal">active</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 due today</p>
                    </div>
                    <Pill className="w-8 h-8 text-chart-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                      <p className="text-2xl font-bold">
                        85<span className="text-sm font-normal">/100</span>
                      </p>
                      <p className="text-xs text-accent">Excellent</p>
                    </div>
                    <Activity className="w-8 h-8 text-chart-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Metrics and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HealthMetricsChart />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>

            {/* Upcoming Appointments & Medication Reminders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Sarah Smith</p>
                      <p className="text-sm text-muted-foreground">Cardiology Checkup</p>
                      <p className="text-sm text-muted-foreground">Dec 15, 2024 at 2:00 PM</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Michael Johnson</p>
                      <p className="text-sm text-muted-foreground">Annual Physical</p>
                      <p className="text-sm text-muted-foreground">Dec 22, 2024 at 10:00 AM</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Medication Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div>
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-sm text-muted-foreground">Due in 2 hours</p>
                    </div>
                    <Badge variant="secondary">Due Soon</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">Due at 8:00 PM</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Vitamin D3</p>
                      <p className="text-sm text-muted-foreground">Daily supplement</p>
                    </div>
                    <Badge variant="outline">Daily</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Medications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "appointments":
        return <AppointmentsList />
      case "medications":
        return <MedicationTracker />
      case "medicine-identifier":
        return <MedicineIdentifier />
      case "health-metrics":
        return <HealthMetricsChart />
      case "records":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Medical Records
              </CardTitle>
              <CardDescription>Access your complete medical history and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-medium">Lab Results</p>
                          <p className="text-sm text-muted-foreground">Dec 1, 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-medium">X-Ray Report</p>
                          <p className="text-sm text-muted-foreground">Nov 15, 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-medium">Prescription History</p>
                          <p className="text-sm text-muted-foreground">Updated daily</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        )
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-balance">Welcome back, John</h2>
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

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  )
}

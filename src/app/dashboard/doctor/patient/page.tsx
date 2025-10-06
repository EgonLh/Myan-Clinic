"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Users, UserPlus, Heart, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetAppointmentsByDoctorQuery } from "@/app/store/features/appointment/appointmentApi";

export default function PatientsPage() {
  const doctorId = useSelector((state: RootState) => state.doctor.id);

  // Show loading while doctorId is not available
  if (!doctorId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading doctor data...</p>
      </div>
    );
  }

  // Fetch appointments for this doctor
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetAppointmentsByDoctorQuery(doctorId, { skip: !doctorId });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading appointments...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to load appointments.</p>
      </div>
    );

  const totalPatients = appointments.length;
  const criticalPatients = appointments.filter(a => a.status === "critical").length;
  const stablePatients = appointments.filter(a => a.status === "stable").length;
  const monitoringPatients = appointments.filter(a => a.status === "monitoring").length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patients</h1>
              <p className="text-muted-foreground">Manage patient records and information</p>
            </div>
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPatients}</div>
                <p className="text-xs text-muted-foreground">Active records</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{criticalPatients}</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stable</CardTitle>
                <Heart className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stablePatients}</div>
                <p className="text-xs text-muted-foreground">Good condition</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitoringPatients}</div>
                <p className="text-xs text-muted-foreground">Under observation</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>View and manage all patient information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patients..." className="pl-10" />
                </div>
              </div>

              {/* Patients Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patient?.user?.name || "N/A"}</TableCell>
                        <TableCell>{appointment.patient?.age || "N/A"}</TableCell>
                        <TableCell>{appointment.patient?.gender || "N/A"}</TableCell>
                        <TableCell>{appointment.type || "N/A"}</TableCell>
                        <TableCell>{appointment.room || "N/A"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === "stable"
                                ? "default"
                                : appointment.status === "critical"
                                  ? "destructive"
                                  : appointment.status === "monitoring"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{appointment.lastVisit || "N/A"}</TableCell>
                        <TableCell>{appointment.nextAppointment || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

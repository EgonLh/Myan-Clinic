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
import { Search, Users, UserCheck, Activity } from "lucide-react";
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi";
import { useGetAppointmentsQuery } from "@/app/store/features/appointment/appointmentApi";

export default function DoctorAvailabilityPage() {
  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctorsQuery();
  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointmentsQuery();

  if (doctorsLoading || appointmentsLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );

  // Filter appointments per doctor
  const getAppointmentsByDoctor = (doctorId: number) =>
    appointments.filter((appt) => appt.doctorId === doctorId);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Doctor Availability</h1>
              <p className="text-muted-foreground">
                Track doctors' appointments and their statuses
              </p>
            </div>
            <Button className="w-fit">
              <Users className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Doctor Schedule</CardTitle>
              <CardDescription>View doctors and their appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search doctors..." className="pl-10" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor Name</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Upcoming Appointments</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((doctor) => {
                      const doctorAppointments = getAppointmentsByDoctor(doctor.id);
                      const upcomingAppointments = doctorAppointments.filter(
                        (appt) => appt.status.toLowerCase() === "pending"
                      );

                      return (
                        <TableRow key={doctor.id}>
                          <TableCell className="font-medium">{doctor.user.name}</TableCell>
                          <TableCell>{doctor.license}</TableCell>
                          <TableCell>{doctor.department?.name || "N/A"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                doctor.user.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {doctor.user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {upcomingAppointments.length > 0 ? (
                              upcomingAppointments.map((appt) => (
                                <div key={appt.id} className="flex flex-col">
                                  <span>
                                    {new Date(appt.date).toLocaleString()} - {appt.patient.user.name}
                                  </span>
                                  <Badge
                                    variant={
                                      appt.status.toLowerCase() === "pending"
                                        ? "default"
                                        : appt.status.toLowerCase() === "done"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {appt.status}
                                  </Badge>
                                </div>
                              ))
                            ) : (
                              <span>No upcoming appointments</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

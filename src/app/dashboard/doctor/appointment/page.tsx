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
import { Search, Plus, Calendar, Clock, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetAppointmentsByDoctorQuery } from "@/app/store/features/appointment/appointmentApi";

export default function AppointmentsPage() {
  // ✅ Get doctor id from Redux store
  const doctorId = useSelector((state: RootState) => state.doctor.id);
  console.log("doctor id",doctorId)
  // ✅ Show loading while doctorId is not available
  if (!doctorId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading doctor data...</p>
      </div>
    );
  }

  // ✅ Fetch appointments for this doctor
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetAppointmentsByDoctorQuery(doctorId, {
    skip: !doctorId, // Skip query if doctorId is not ready
  });

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
              <p className="text-muted-foreground">Manage your patient appointments</p>
            </div>
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">Fetched from API</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </div>
                <p className="text-xs text-muted-foreground">Confirmed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter((a) => a.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter((a) => a.status === "cancelled").length}
                </div>
                <p className="text-xs text-muted-foreground">Cancelled</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appointment List</CardTitle>
              <CardDescription>View and manage all appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patients..." className="pl-10" />
                </div>
              </div>

              {/* Appointments Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.patient?.user?.name || "N/A"}
                        </TableCell>
                        <TableCell>{appointment?.date}</TableCell>
                        <TableCell>{appointment?.time}</TableCell>
                        <TableCell>{appointment?.type}</TableCell>
                        <TableCell>{appointment?.duration}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
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

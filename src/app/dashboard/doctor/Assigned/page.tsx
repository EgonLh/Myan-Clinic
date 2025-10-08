"use client";

import { useState } from "react";
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
import { Search, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetAppointmentsQuery,
  useGetAppointmentsByDoctorQuery,
} from "@/app/store/features/appointment/appointmentApi";
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi";

export default function DoctorAvailabilityPage() {
  const [generalistView, setGeneralistView] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [selectedDoctorAppointments, setSelectedDoctorAppointments] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctorsQuery();
  const doctorData = useSelector((state: RootState) => state.doctor?.data);
  const doctorId = doctorData?.id || "";

  // Fetch appointments based on generalist or assigned view
  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
    isError,
  } = generalistView
      ? useGetAppointmentsQuery()
      : useGetAppointmentsByDoctorQuery(doctorId, { skip: !doctorId });

  if (doctorsLoading || appointmentsLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to load appointments.</p>
      </div>
    );

  const handleViewAppointments = (doctorId: number) => {
    const doctorAppointments = appointments.filter((appt) => appt.doctorId === doctorId);
    setSelectedDoctorAppointments(doctorAppointments);
    setDialogOpen(true);
  };

  const formatTimeRange = (start: string, duration: number) => {
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);
    return `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  // Filter doctors by search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.user.name.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background  flex justify-center">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 max-w-[80rem] sm:p-6 md:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-foreground">
              Doctor Availability
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track doctors' appointments and their statuses
            </p>
          </div>
          {doctorData?.type === "Generalist" && (
            <Button
              className="w-full md:w-fit text-sm md:text-base flex items-center justify-center gap-2"
              onClick={() => setGeneralistView((prev) => !prev)}
            >
              <Users className="h-4 w-4" />
              {generalistView ? "Assigned View" : "Diagnosis View"}
            </Button>
          )}
        </div>

        {/* Doctor Search */}
        <div className="mb-4 w-full md:w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name..."
              className="pl-10 w-full"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Doctor Table */}
        <Card>
          <CardHeader>
            <CardTitle>Doctor Schedule</CardTitle>
            <CardDescription>View and manage doctor appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor Name</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => {
                    // Get upcoming appointments for this doctor
                    const doctorAppointments = appointments
                      .filter((appt) => appt.doctorId === doctor.id)
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    // Pick the next appointment as an example
                    const nextAppt = doctorAppointments[0];

                    const apptDate = nextAppt ? new Date(nextAppt.date).toLocaleDateString() : "-";
                    const apptTime = nextAppt
                      ? `${new Date(nextAppt.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(new Date(nextAppt.date).getTime() + nextAppt.duration * 60 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "-";

                    return (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">{doctor.user.name}</TableCell>
                        <TableCell>{doctor.license}</TableCell>
                        <TableCell>{doctor.department?.name || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant={doctor.user.status === "active" ? "default" : "secondary"}>
                            {doctor.user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{apptDate}</TableCell>
                        <TableCell>{apptTime}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewAppointments(doctor.id)}
                          >
                            View Appointments
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

        {/* Dialog for Detailed Appointments */}
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
          <DialogContent className="max-w-[400px] max-h-[400px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>Upcoming Appointments</DialogTitle>
              <DialogDescription>
                List of all appointments for this doctor with start and end times.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4 text-sm">
              {selectedDoctorAppointments.length > 0 ? (
                selectedDoctorAppointments.map((appt) => (
                  <div key={appt.id} className="border-b pb-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Patient:</span>
                      <span>{appt.patient?.user?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(appt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Time:</span>
                      <span>{formatTimeRange(appt.date, appt.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Status:</span>
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
                  </div>
                ))
              ) : (
                <p>No upcoming appointments.</p>
              )}

            </div>
            <DialogFooter className="mt-4">
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

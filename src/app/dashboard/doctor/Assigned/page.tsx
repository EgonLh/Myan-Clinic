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
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetAppointmentsQuery,
} from "@/app/store/features/appointment/appointmentApi";
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi";

export default function DoctorAvailabilityPage() {
  const [doctorSearch, setDoctorSearch] = useState("");
  const [selectedDoctorAppointments, setSelectedDoctorAppointments] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");

  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctorsQuery();
  const doctorData = useSelector((state: RootState) => state.doctor?.data);

  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
    isError,
  } = useGetAppointmentsQuery();

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

  // Extract unique departments
  const departments = Array.from(
    new Set(doctors.map((d) => d.department?.name).filter(Boolean))
  );

  // Filter doctors by search and department
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.user.name
      .toLowerCase()
      .includes(doctorSearch.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || !departmentFilter
        ? true
        : doctor.department?.name === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background justify-center">
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


        </div>


        {/* Doctor Table */}
        <Card className="shadow-none ">
          <CardHeader>
            <CardTitle>Doctor Schedule</CardTitle>
            <CardDescription>View and manage doctor appointments</CardDescription>
            <div className="flex my-4 relative justify-between w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name..."
                className="pl-10 w-full border shadow-none me-2"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
              />
              <Select onValueChange={(value) => setDepartmentFilter(value)} value={departmentFilter}>
                <SelectTrigger className="w-[200px] font-mono text-xs shadow-none">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-slate-200/[0.1] overflow-x-auto">
              <Table className="min-w-[900px] p-1">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono">Doctor Name</TableHead>
                    <TableHead className="font-mono">License</TableHead>
                    <TableHead className="font-mono">Department</TableHead>
                    <TableHead className="font-mono">Status</TableHead>
                    <TableHead className="font-mono">Date</TableHead>
                    <TableHead className="font-mono">Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => {
                    const doctorAppointments = appointments
                      .filter((appt) => appt.doctorId === doctor.id)
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
          <DialogContent className="max-w-[400px] max-h-3/4 overflow-scroll">
            <DialogHeader>
              <DialogTitle>Total Appointments [ {selectedDoctorAppointments.length} ]</DialogTitle>
              <DialogDescription>
                List of all appointments for this doctor with start and end times.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4 text-sm">
              {selectedDoctorAppointments.length > 0 ? (
                selectedDoctorAppointments.map((appt) => (
                  <div key={appt.id} className="border-b-2 hover:border hover:border-solid border-dashed hover:p-2 transition-all duration-300s hover:rounded pb-2">
                    <div className="flex justify-between ">
                      <span className="font-semibold font-mono text-xs my-1">Patient:</span>
                      <span>{appt.patient?.user?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs my-1">
                      <span className="font-semibold">Date:</span>
                      <span className="text-muted-foreground">{new Date(appt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs my-1">
                      <span className="font-semibold">Time:</span>
                      <span>{formatTimeRange(appt.date, appt.duration)}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs my-1">
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

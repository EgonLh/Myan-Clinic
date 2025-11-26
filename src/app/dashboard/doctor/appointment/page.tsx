"use client";  //#
import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Search, Calendar, Clock, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetAppointmentsByDoctorQuery,
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "@/app/store/features/appointment/appointmentApi";
import LoadingPills from "@/components/ui/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AppointmentsPage() {
  // State for filters and selected appointment
  const [generalistView, setGeneralistView] = useState(false); // Generalist toggle
  const [search, setSearch] = useState(""); // Search patients
  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "pending" | "cancelled">("all"); // Status filter
  const [todayFilter, setTodayFilter] = useState(false); // Today filter toggle
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null); // Modal
  const [updateAppointment] = useUpdateAppointmentMutation();
  // Redux selector for doctor data
  const doctorData = useSelector((state: RootState) => state.doctor?.data);
  const doctorId = doctorData?.id || "";
  // --current-token--//

  const handleConfirmed = (app_id: number) => {
    if (!appointments) return;

    // Get the appointment to confirm
    const appointmentToConfirm = appointments.find((a) => a.id === app_id);
    if (!appointmentToConfirm) return;

    // Prepare updated notes
    let updatedNotes = appointmentToConfirm.notes || "";

    // Check if note includes 'diagnosis' (case-insensitive)
    if (updatedNotes.toLowerCase().includes("diagnosis")) {
      // Get all appointments for the same day
      const appointmentDate = new Date(appointmentToConfirm.date);
      const sameDayAppointments = appointments
        .filter((a) => {
          const d = new Date(a.date);
          return (
            d.getFullYear() === appointmentDate.getFullYear() &&
            d.getMonth() === appointmentDate.getMonth() &&
            d.getDate() === appointmentDate.getDate()
          );
        })
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      // Determine token number based on order
      const tokenNumber = sameDayAppointments.findIndex((a) => a.id === app_id) + 1;

      // Append token
      updatedNotes += ` | Token #${tokenNumber}`;
    }

    // Prepare updated object
    const confirmObj = {
      status: "Confirmed" as "Confirmed",
      notes: updatedNotes,
    };

    // Update appointment
    updateAppointment({ id: Number(app_id), body: confirmObj });
    setSelectedAppointment(null);
  };

  const handleCancel = (app_id: number, reason?: string) => {
    if (!appointments) return;

    const cancelObj = {
      status: "Cancelled" as const,
      notes: reason || "Appointment cancelled By The Doctor",
    };

    updateAppointment({ id: app_id, body: cancelObj });
    setSelectedAppointment(null);
  };
  // Loading doctor data
  if (!doctorId || !doctorData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPills message="User Data is Loading..." />
      </div>
    );
  }

  // Fetch appointments: Generalist sees all, others see assigned
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = generalistView
      ? useGetAppointmentsQuery()
      : useGetAppointmentsByDoctorQuery(doctorId, { skip: !doctorId });


  // Loading state
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPills message="Appointment Data is Loading..." />
      </div>
    );

  // Error state
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <LoadingPills message="Unexpected Error is Occuring..." />
      </div>
    );

  // Format date helper
  const formatDate = (isoDate: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(isoDate));
  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter((a) => {
      // Status filter
      const matchesStatus = statusFilter === "all" || a.status.toLowerCase() === statusFilter;
      // Search filter
      const matchesSearch = a.patient?.user?.name.toLowerCase().includes(search.toLowerCase());
      // Today filter
      const appointmentDate = new Date(a.date);
      const now = new Date();
      const isToday =
        appointmentDate.getFullYear() === now.getFullYear() &&
        appointmentDate.getMonth() === now.getMonth() &&
        appointmentDate.getDate() === now.getDate();
      const matchesToday = todayFilter ? isToday : true;

      return matchesStatus && matchesSearch && matchesToday;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Order by date ascending

  return (
    <div className="flex flex-col  md:flex-row min-h-screen bg-background flex justify-center">
      <div className="w-full md:w-64 flex-shrink-0 justiy-end">
        <Sidebar />
      </div>

      <main className="flex-1 p-4  max-w-[80rem] sm:p-6 md:p-8 overflow-x-hidden">
        {/* Header + Generalist toggle */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Appointments
            </h1>
            <p className="text-muted-foreground text-balance tracking-wide py-2 font-mono text-xs">
              Manage patient appointments <br/> {generalistView ? "- As Generalist" : ""}<br />
              
            </p>
          </div>

          {doctorData?.type === "Generalist" && (
            <Button
              className="w-full md:w-fit text-xs font-mono transition-all duration-300s"
              onClick={() => {
                toast(`You are Viewing as ${generalistView ? "Diagnosis View" : "Assigned View"}`);
                return setGeneralistView((prev) => !prev);
              }}
            >
              {generalistView ? <>Assigned By You</> : <>Assigned To You</>}
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Appointments", value: appointments.length, icon: Calendar, description: "Total number of appointments scheduled" },
            { title: "Confirmed", value: appointments.filter((a) => a.status.toLowerCase() === "confirmed").length, icon: User, description: "Appointments that have been confirmed By Generalist" },
            { title: "Pending", value: appointments.filter((a) => a.status.toLowerCase() === "pending").length, icon: Clock, description: "Appointments that are still awaiting confirmation By Generalist" },
            { title: "Cancelled", value: appointments.filter((a) => a.status.toLowerCase() === "cancelled").length, icon: Calendar, description: "Appointments that have been cancelled by Patient" },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card key={idx} className="rounded-sm hover:bg-slate-400/[0.1] transition-all duration-300s shadow-none border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
                <CardFooter>
                  <p className="text-[10px] font-mono text-justify text-muted-foreground ">
                    {card.description}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Search + Filter */}
        <Card className="mb-6 shadow-none rounded-sm">
          <CardHeader>
            <CardTitle>Appointment List</CardTitle>
            <CardDescription>View and manage all appointments</CardDescription>
            <div className="sm:flex sm:justify-between mt-2 pt-3">
              {/* Status Buttons */}
              <div className="grid grid-cols-4 sm:flex  gap-2 ">
                {["all", "not_started", "pending", "cancelled", "confirmed", "done"].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={statusFilter === status ? "default" : "ghost"}
                    onClick={() => setStatusFilter(status as any)}
                    className="shodow-none"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
              {/* Today Button */}
              <Button
                size="sm"
                variant={todayFilter ? "default" : "ghost"}
                onClick={() => setTodayFilter((prev) => !prev)}
                className="hover:border sm:block hidden"
              >
                Today
              </Button>
            </div>
          </CardHeader>

          {/* Search Input */}
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients"
                  className="pl-10 w-full shadow-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Appointment Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type / Link</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patient?.user?.name || "N/A"}</TableCell>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.type || appointment.meetingLink || "N/A"}</TableCell>
                      <TableCell>{formatDate(appointment.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.status.toLowerCase() === "done"
                              ? "default"
                              : appointment.status.toLowerCase() === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(appointment)}>
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

        {/* Appointment Detail Modal */}
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="max-w-auto">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                View detailed information about this appointment.
              </DialogDescription>
            </DialogHeader>
            <div className="text-xs mt-4 font-mono space-y-3">
              {selectedAppointment && (
                <>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Patient:</span>
                    <span>{selectedAppointment.patient?.user?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Doctor:</span>
                    <span>{selectedAppointment.doctor?.user?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Date:</span>
                    <span>{formatDate(selectedAppointment.date)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Type / Link:</span>
                    <span>{selectedAppointment.type || selectedAppointment.meetingLink || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Invoice:</span>
                    <span>{selectedAppointment?.invoice || "empty"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Status:</span>
                    <span>{selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-semibold">Created At:</span>
                    <span>{formatDate(selectedAppointment.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold me-1">Notes:</span>
                    <span className="text-justify">{selectedAppointment.notes || "No additional notes."}</span>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button onClick={() => setSelectedAppointment(null)}>Close</Button>
              {(selectedAppointment?.status)?.toLowerCase() == "pending" && selectedAppointment?.doctorId == doctorId ? <Button onClick={() => handleConfirmed(selectedAppointment.id)}>Confirm</Button> : ""}
              <Button variant="destructive" onClick={() => handleCancel(selectedAppointment.id, "Cancelled by the doctor")}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

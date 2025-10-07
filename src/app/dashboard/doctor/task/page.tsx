"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, AlertTriangle, CheckCircle, Download, Plus } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useState } from "react";
import { TaskForm } from "@/components/doctors/task-form";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetAppointmentsByDoctorQuery,
  useGetAppointmentsQuery,
} from "@/app/store/features/appointment/appointmentApi";
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi";

// React Big Calendar
import { Calendar as BigCalendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TasksPage() {
  const { getTaskStats, exportTasksAsJSON } = useTasks();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [generalistView, setGeneralistView] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const stats = getTaskStats();

  const doctorData = useSelector((state: RootState) => state.doctor?.data);
  const doctorId = doctorData?.id || "";

  const { data: doctors = [] } = useGetDoctorsQuery();

  // Appointments fetch based on view
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = generalistView
      ? useGetAppointmentsQuery()
      : useGetAppointmentsByDoctorQuery(doctorId, { skip: !doctorId });

  // Filter by selected doctor in generalist view
  const filteredAppointments = generalistView
    ? appointments.filter((a) => !selectedDoctorId || a.doctorId == selectedDoctorId)
    : appointments;

  console.log(selectedDoctorId)
  const calendarEvents = filteredAppointments.map((appt) => ({
    id: appt.id,
    title: `${appt.patient?.user?.name || "Unknown"} (${appt.status})`,
    start: new Date(appt.date),
    end: new Date(new Date(appt.date).getTime() + appt.duration * 60 * 60 * 1000),
    patientName: appt.patient?.user?.name,
    status: appt.status,
    description: appt.description,
    notes: appt.notes,
    meetingLink: appt.meetingLink,
    invoice: appt.invoice,
    costs: appt.costs,
  }));

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (isError) return <div className="flex items-center justify-center h-screen text-red-500">Failed to load appointments.</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-background">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks & Schedule</h1>
              <p className="text-sm md:text-base text-muted-foreground">Manage your daily tasks and appointments</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="outline" onClick={exportTasksAsJSON}>
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>

              {/* Show only for Generalist doctors */}
              {doctorData?.type === "Generalist" && (
  <div className="flex flex-wrap gap-2 items-center">
    {/* Add Task button */}
    <Button className="w-fit" onClick={() => setIsTaskFormOpen(true)}>
      <Plus className="h-4 w-4 mr-2" />
      Assign Appointments
    </Button>

    {/* Toggle Generalist View */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setGeneralistView((prev) => !prev)}
    >
      {generalistView ? "All Appointments" : "Assigned"}
    </Button>

    {/* Doctor filter dropdown, only when viewing All Appointments */}
    {generalistView && (
      <select
        value={selectedDoctorId || ""}
        onChange={(e) => setSelectedDoctorId(e.target.value || null)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="">All Doctors</option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.user.name}
          </option>
        ))}
      </select>
    )}
  </div>
)}

            </div>

          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.today}</div>
                <p className="text-xs text-muted-foreground">{stats.todayCompleted} completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Awaiting completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.highPriority}</div>
                <p className="text-xs text-muted-foreground">Urgent attention needed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
                <p className="text-xs text-muted-foreground">Total completed tasks</p>
              </CardContent>
            </Card>
          </div>

          {/* Appointment List + Calendar */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Appointment List */}
            <div className="w-full md:w-1/4 max-h-[600px] overflow-y-auto border rounded-md p-2">
              <h2 className="text-sm font-semibold mb-2">Appointments</h2>
              {filteredAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => {
                    setSelectedDate(new Date(appt.date));
                    setSelectedEvent(calendarEvents.find((e) => e.id === appt.id) || null);
                  }}
                >
                  <p className="text-sm font-medium">{appt.patient.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appt.date).toLocaleDateString()} -{" "}
                    {new Date(appt.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-xs text-muted-foreground">{appt.status}</p>
                </div>
              ))}
            </div>

            {/* Calendar + Appointment Detail */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="overflow-x-auto">
                <div className="min-w-[300px] md:min-w-full">
                  <BigCalendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    date={selectedDate || new Date()}
                    onNavigate={(date) => setSelectedDate(date)}
                    views={["month"]}
                    components={{ toolbar: () => null }}
                    style={{ height: 600, borderRadius: "8px", border: "1px solid #e5e7eb" }}
                    onSelectEvent={(event: any) => setSelectedEvent(event)}
                  />
                </div>
              </div>

              {/* Selected Appointment Detail */}
              {selectedEvent && (
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">{selectedEvent.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <p>
                      <strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {selectedEvent.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                      {selectedEvent.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedEvent.status}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedEvent.description || "-"}
                    </p>
                    <p>
                      <strong>Notes:</strong> {selectedEvent.notes || "-"}
                    </p>
                    {selectedEvent.meetingLink && (
                      <p>
                        <strong>Meeting Link:</strong>{" "}
                        <a href={selectedEvent.meetingLink} target="_blank" className="text-blue-500 underline">
                          Join
                        </a>
                      </p>
                    )}
                    {selectedEvent.invoice && (
                      <p>
                        <strong>Invoice:</strong> {selectedEvent.invoice}
                      </p>
                    )}
                    {selectedEvent.costs && (
                      <p>
                        <strong>Costs:</strong> ${selectedEvent.costs}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      <TaskForm isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} onSubmit={() => { }} />
    </>
  );
}

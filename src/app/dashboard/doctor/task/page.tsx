"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import LoadingPills from "@/components/ui/loading";

const localizer = momentLocalizer(moment);

export default function TasksPage() {
  const { getTaskStats, exportTasksAsJSON } = useTasks();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [generalistView, setGeneralistView] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const stats = getTaskStats();
  const router = useRouter()

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

  // go to detail assignment
  const goToDetail = () => {
    router.push('create-appointment');
  }
  console.log(selectedDoctorId)
  const calendarEvents = filteredAppointments.map((appt) => ({
    id: appt.id,
    title: `@ ${appt.patient?.user?.name || "Unknown"} `,
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

  if (isLoading) return <div className="flex items-center justify-center h-screen"><LoadingPills message="Data is Loading .."/></div>;
  if (isError) return <div className="flex items-center justify-center h-screen text-red-500"><LoadingPills message="Data is Fetching .."/></div>;

  return (
    <>
      <div className="flex flex-col  md:flex-row min-h-screen bg-background  flex justify-center">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1  max-w-[80rem] p-4 md:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks & Schedule</h1>
              <p className="text-sm md:text-base text-muted-foreground">Manage your daily tasks and appointments</p>
              <p className="text-xs font-mono text-muted-foreground">{generalistView ? "You are viewing as Generalist" : ""}</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">


              {/* Show only for Generalist doctors */}
              {doctorData?.type === "Generalist" && (
                <div className="flex flex-wrap gap-2 items-center">



                  {/* Doctor filter dropdown, only when viewing All Appointments */}
                  {generalistView && (
                    <>
                      <select
                        value={selectedDoctorId || ""}
                        onChange={(e) => setSelectedDoctorId(e.target.value ? Number(e.target.value) : null)}
                        className="border  px-3 py-2 text-sm shadow-none bg-slate-900 text-white font-mono font-medium rounded-md"
                      >
                        <option value="">All Doctors</option>
                        {doctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.user.name}
                          </option>
                        ))}
                      </select>
                      {/* Add Task button */}
                      <Button className="w-fit text-xs py-2" onClick={() => goToDetail()}>
                        <Plus className="h-3 w-3" />
                      </Button></>
                  )}

                  {/* Toggle Generalist View */}
                  <Button
                    variant="default"
                    onClick={() => setGeneralistView((prev) => !prev)}
                    className="shadow-none text-xs py-2 font-mono font-semibold"
                  >
                    {generalistView ? "All Appointments" : "Assigned"}
                  </Button>
                </div>
              )}

            </div>

          </div>



          {/* Appointment List + Calendar */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* Appointment List */}
            <div className="w-full md:w-1/4   border rounded-md p-2">
              <h2 className="text-sm font-semibold mb-2 underline w-full text-center font-mono mt-2">Appointments List</h2>
              {filteredAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-2 hover:border hover:my-2 cursor-pointer transition-all duration-300 border-b hover:rounded"
                  onClick={() => {
                    setSelectedDate(new Date(appt.date));
                    setSelectedEvent(calendarEvents.find((e) => e.id === appt.id) || null);
                  }}
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{appt.patient.user.name}</p>
                    <p className="text-xs text-muted-foreground">{appt.status}</p>
                  </div>
                  <p className="text-xs my-1 text-muted-foreground font-mono rounded hover:border transition-all duration-300 w-fit hover:p-1">
                    {new Date(appt.date).toLocaleDateString()} -{" "}
                    {new Date(appt.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>

                  <p className="text-xs text-muted-foreground font-mono">{appt.notes}</p>

                </div>
              ))}
            </div>

            {/* Calendar + Appointment Detail */}
            <div className="flex-1 flex flex-col gap-4 border-0 ">
              <div className="overflow-x-auto border-0 ">
                <div className="mb-1 flex justify-end items-center">
                  <Button
                    variant="outline"

                    className="text-xs  shadow-none font-mono font-semibold"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>

                  <div className=" flex items-center ms-1">
                    <div className="px-3 py-2 border rounded-md text-xs font-semibold bg-slate-100 text-slate-800">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="min-w-[300px] md:min-w-full  border-0">
                  <BigCalendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    date={selectedDate || new Date()}
                    onNavigate={(date) => setSelectedDate(date)}
                    views={["month"]}
                    components={{ toolbar: () => null }}
                    style={{
                      height: 600,
                      borderRadius: "10px",
                      border: "1px solid gray",
                      overflow: "hidden",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    onSelectEvent={(event: any) => setSelectedEvent(event)} // store selected
                    eventPropGetter={(event) => {
                      let backgroundColor = "black"


                      backgroundColor = "#0c120bff"

                      // ✅ highlight selected event
                      if (selectedEvent && selectedEvent.id === event.id) {
                        backgroundColor = "#69655fff" // bright orange for selected
                        return {
                          style: {
                            backgroundColor,
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            borderRadius: "5px",
                            border: "1px solid #fff",
                            transform: "scale(1.02)",
                            transition: "all 0.2s ease",
                          },
                        }
                      }

                      return {
                        style: {
                          backgroundColor,
                          color: "white",
                          borderRadius: "6px",
                          border: "none",
                          transition: "all 0.2s ease",
                        },
                      }
                    }}
                  />


                </div>
              </div>

              {/* Selected Appointment Detail */}
              {selectedEvent && (
                <Card className="border order-0 shadow-none rounded-sm border-gray-300  bg-white font-mono">
                  <CardHeader className="border-b pb-2">
                    <CardTitle className="text-sm font-semibold text-center tracking-wide uppercase">
                      #Appointment Detail
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-xs grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                    <p className="text-gray-600">Patient:</p>
                    <p className="font-semibold text-gray-900">
                      {selectedEvent?.title}
                    </p>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-semibold text-gray-900">
                      {selectedEvent?.start?.toLocaleDateString()}
                    </p>

                    <p className="text-gray-600">Time:</p>
                    <p className="font-semibold text-gray-900">
                      {selectedEvent?.start?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                      {selectedEvent?.end?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>

                    <p className="text-gray-600">Status:</p>
                    <p className="font-semibold text-gray-900">{selectedEvent?.status}</p>

                    <p className="text-gray-600">Description:</p>
                    <p className="font-semibold text-gray-900">{selectedEvent?.description || "-"}</p>

                    <p className="text-gray-600">Notes:</p>
                    <p className="font-semibold text-gray-900">{selectedEvent?.notes || "-"}</p>

                    {selectedEvent?.meetingLink && (
                      <>
                        <p className="text-gray-600">Meeting Link:</p>
                        <p>
                          <a
                            href={selectedEvent?.meetingLink}
                            target="_blank"
                            className="text-blue-600 underline font-semibold"
                          >
                            Join
                          </a>
                        </p>
                      </>
                    )}

                    {selectedEvent?.invoice && (
                      <>
                        <p className="text-gray-600">Invoice No:</p>
                        <p className="font-semibold text-gray-900">{selectedEvent?.invoice}</p>
                      </>
                    )}

                    {selectedEvent.costs && (
                      <>
                        <p className="text-gray-600">Cost:</p>
                        <p className="font-semibold text-gray-900">${selectedEvent.costs}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </main>
      </div>


    </>
  );
}

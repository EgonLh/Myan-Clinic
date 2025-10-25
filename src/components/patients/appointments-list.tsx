"use client";
// ----- Component: AppointmentsList ----- //
// - Review [x]
// ----- Imports ----- //
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileUp } from "lucide-react";
import {
  useGetAppointmentsByPatientQuery,
  useUploadInvoiceByAppointmentIdMutation,
  useUpdateAppointmentMutation,
} from "@/app/store/features/appointment/appointmentApi";
import "react-datepicker/dist/react-datepicker.css";

// ----- Props Interface ----- //
interface AppointmentsListProps {
  patientId: number;
}

// ----- AppointmentsList Component ----- //
export function AppointmentsList({ patientId }: AppointmentsListProps) {
  // ----- API Queries & Mutations ----- //
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId);
  const [uploadInvoice] = useUploadInvoiceByAppointmentIdMutation();
  const [updateStatus] = useUpdateAppointmentMutation();

  // ----- Local State ----- //
  const [detailDialog, setDetailDialog] = useState<any | null>(null); // Selected appointment for modal
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Selected file for invoice
  const [filterDoctor, setFilterDoctor] = useState("All"); // Doctor filter
  const [filterStatus, setFilterStatus] = useState("All"); // Status filter

  // ----- Loading / Empty States ----- //
  if (isLoading) return <p>Loading appointments...</p>;
  if (!appointments) return <p className="text-muted-foreground">No appointments found.</p>;

  // ----- Unique Doctors & Statuses for Filters ----- //
  const uniqueDoctors = Array.from(new Set(appointments.map(a => a.doctor?.user?.name).filter(Boolean)));
  const uniqueStatuses = Array.from(new Set(appointments.map(a => a.status)));

  // ----- Sorted & Filtered Appointments ----- //
  const sortedAppointments = useMemo(() => {
    return [...appointments]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter(a =>
        (filterDoctor === "All" || a.doctor?.user?.name === filterDoctor) &&
        (filterStatus === "All" || a.status === filterStatus)
      );
  }, [appointments, filterDoctor, filterStatus]);

  // ----- File Selection Handler ----- //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  // ----- Upload Invoice & Update Status ----- //
  const pendingObj = { status: "Pending" as "Pending" };
  const handleUploadInvoice = async () => {
    if (!selectedFile || !detailDialog) return;

    try {
      // Update status to Pending
      await updateStatus({ id: Number(detailDialog.id), body: pendingObj });

      // Upload invoice
      await uploadInvoice({ id: Number(detailDialog.id), file: selectedFile }).unwrap();

      alert("Invoice uploaded successfully");
      setSelectedFile(null);
      setDetailDialog(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload invoice");
    }
  };

  // ----- Render Component ----- //
  return (
    <div>
      {/* ----- Appointment Cards Container ----- */}
      <Card className="rounded-sm p-0 border-none shadow-none px-0 mx-0">
        <CardContent className="px-0">
          
          {/* ----- Filters Section ----- */}
          <div className="flex flex-col md:flex-row gap-3 mb-4 text-sm">
            {/* Doctor Filter */}
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="border p-2 font-mono text-xs rounded"
            >
              <option value="All">All Doctors</option>
              {uniqueDoctors.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 font-mono text-xs rounded"
            >
              <option value="All">All Status</option>
              {uniqueStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* ----- Appointment Cards Grid ----- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {sortedAppointments.map((appointment) => {
              // Format appointment date & time
              let appointmentDate: string;
              let appointmentTime: string;

              if (appointment.notes?.toLowerCase().includes("diagnosis")) {
                // Hide time for diagnosis
                appointmentDate = new Date(appointment.date).toLocaleDateString();
                appointmentTime = ""; // No time
              } else {
                const dateObj = new Date(appointment.date);
                appointmentDate = dateObj.toLocaleDateString();
                appointmentTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              }

              return (
                <Card key={appointment.id} className="hover:bg-slate-100/[0.3] transition-shadow shadow-none border-dashed border-1 rounded-sm">
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      {/* ----- Appointment Info ----- */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold font-mono">{appointment.doctor?.user?.name ?? "Unknown Doctor"}</h3>
                          <Badge variant="outline">{appointment.doctor?.type ?? "General"}</Badge>
                          <Badge variant={appointment.status === "done" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex font-mono text-xs items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointmentDate}
                          </div>
                          <div className="flex items-center font-mono text-xs gap-1">
                            <Clock className="w-4 h-4" />
                            {appointmentTime ? " - " + appointmentTime : " Token Only"}
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="flex font-normal text-justify hover:tracking-wide transition-all duration-300 items-center w-full gap-1 text-sm text-slate-400">
                          {appointment.notes}
                        </div>
                      </div>

                      {/* ----- Actions ----- */}
                      <div className="flex gap-2">
                        <Button
                          variant={"ghost"}
                          className="text-slate-300 hover:underline hover:text-slate-900 w-fit h-fit text-xs"
                          onClick={() => setDetailDialog(appointment)}
                        >
                          View Details
                        </Button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </CardContent>
      </Card>

      {/* ----- Detail Dialog ----- */}
      {detailDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white text-sm p-6 w-full max-w-md border border-dotted border-neutral-300 rounded-sm shadow-none space-y-3 font-mono">
            
            {/* Dialog Title */}
            <h2 className="text-base font-semibold border-b border-dotted border-neutral-300 pb-2">
              Appointment Receipt
            </h2>

            {/* Appointment Info */}
            <div className="space-y-1">
              <p><strong>Doctor:</strong> {detailDialog.doctor?.user?.name}</p>
              <p><strong>Date:</strong> {new Date(detailDialog.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {detailDialog.status}</p>
              <p><strong>Type:</strong> {detailDialog.description}</p>
              <p><strong>Cost:</strong> {detailDialog.costs ?? "N/A"} MMK</p>
            </div>

            {/* Divider */}
            <div className="border-t border-dotted border-neutral-300 my-2" />

            {/* Upload Invoice */}
            {!detailDialog.invoice && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wide text-muted-foreground">
                  Upload Invoice
                </label>
                <input
                  type="file"
                  accept=".pdf,.png"
                  onChange={handleFileChange}
                  className="text-xs w-full border border-dotted border-neutral-300 p-1.5 rounded-sm"
                />
                <Button
                  className="w-full mt-2 flex items-center justify-center gap-1 rounded-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                  onClick={handleUploadInvoice}
                  disabled={!selectedFile}
                >
                  <FileUp className="w-4 h-4" /> Upload
                </Button>
              </div>
            )}

            {/* Invoice Already Uploaded */}
            {detailDialog.invoice && (
              <p className="text-xs text-green-700 font-mono text-center">
                Invoice already uploaded 
              </p>
            )}

            {/* Close Button */}
            <div className="border-t border-dotted border-neutral-300 pt-2 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setDetailDialog(null)}
                className="rounded-sm border border-dotted text-neutral-700 hover:bg-neutral-100"
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

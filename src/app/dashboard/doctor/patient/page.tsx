"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetAppointmentsByDoctorQuery } from "@/app/store/features/appointment/appointmentApi";
import LoadingPills from "@/components/ui/loading";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetPatientByIdQuery } from "@/app/store/features/patient/patientApi";
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi";
import PatientDetailDialog from "@/components/patients/patientDetailDialog";

export default function PatientsPage() {
  const doctorData = useSelector((state: RootState) => state.doctor?.data);
  const doctorId = doctorData?.id || "";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const statusOptions = ["All", "Active", "Inactive"];

  // Handle no doctor data
  if (!doctorId || !doctorData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPills message="User Data is Loading..." />
      </div>
    );
  }

  // Fetch appointments by doctor
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetAppointmentsByDoctorQuery(doctorId, { skip: !doctorId });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPills message="Patient Data is Loading..." />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <LoadingPills message="Unexpected Error Occurred..." />
      </div>
    );

  // Deduplicate patients & count appointments
  const patientMap: Record<number, { patient: any; count: number; appointments: any[] }> = {};
  appointments.forEach((appt) => {
    const patientId = appt.patient?.id;
    if (patientId) {
      if (!patientMap[patientId]) {
        patientMap[patientId] = { patient: appt.patient, count: 1, appointments: [appt] };
      } else {
        patientMap[patientId].count += 1;
        patientMap[patientId].appointments.push(appt);
      }
    }
  });

  // Filter patients by search and status
  const filteredPatients = Object.values(patientMap).filter(({ patient }) => {
    const nameMatch = patient.user?.name?.toLowerCase().includes(search.toLowerCase());
    const statusMatch =
      statusFilter === "All" || patient.user?.status === (statusFilter).toLowerCase();
    return nameMatch && statusMatch;
  });

  // Fetch single patient & storage data
  const { data: patientDetails, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    selectedPatientId!,
    {
      skip: selectedPatientId === null,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const { data: storageData, isLoading: isStorageLoading } = useGetStorageByPatientQuery(
    selectedPatientId!,
    { skip: selectedPatientId === null }
  );

  const formatDate = (isoDate: string) =>
    isoDate
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(isoDate))
      : "N/A";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background  flex justify-center">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1  max-w-[80rem] p-4 sm:p-6 md:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground font-mono text-xs">
              Manage your patient records
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="mb-6 shadow-none rounded-sm">
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>
              View and update patient information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients"
                  className="pl-10 w-full shadow-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                className="border rounded-md px-3 py-2 text-sm bg-background font-mono"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Appointments</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(({ patient, count }) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.user?.name || "N/A"}
                        </TableCell>
                        <TableCell>{count}</TableCell>
                        <TableCell>{patient.age || "N/A"}</TableCell>
                        <TableCell>{patient.user?.gender || "N/A"}</TableCell>
                        <TableCell>
                          <div
                            className={`px-2 py-0.5 rounded text-xs font-semibold w-fit ${
                              patient.user?.status === "Active"
                                ? "bg-green-500 text-white"
                                : patient.user?.status === "Inactive"
                                ? "bg-gray-300 text-black"
                                : "bg-gray-200 text-black"
                            }`}
                          >
                            {patient.user?.status || "Unknown"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPatientId(patient.id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No patients found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Patient Detail Modal */}
        <Dialog open={!!selectedPatientId} onOpenChange={() => setSelectedPatientId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
              <DialogDescription>View and update patient information</DialogDescription>
            </DialogHeader>

            {(isPatientLoading || isStorageLoading) ? (
              <p>Loading.....</p>
            ) : patientDetails ? (
              <PatientDetailDialog
                patient={patientDetails}
                appointments={appointments.filter((a) => a.patient?.id === selectedPatientId)}
                storageData={storageData}
                formatDate={formatDate}
                onClose={() => setSelectedPatientId(null)}
              />
            ) : (
              <p className="text-red-500 text-center mt-4">
                Patient details not found.
              </p>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

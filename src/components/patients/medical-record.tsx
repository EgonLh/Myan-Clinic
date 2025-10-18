"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Info } from "lucide-react"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface MedicalRecordsProps {
  patientId: number | undefined
}

export function MedicalRecords({ patientId }: MedicalRecordsProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  if (isLoading) return <p>Loading medical records...</p>
  if (!appointments || appointments.length === 0)
    return <p className="text-muted-foreground">No medical records found.</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Medical Records
        </CardTitle>
        <CardDescription>
          Access your complete medical history and documents
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Doctor</th>
                <th className="p-2 border-b">Specialty</th>
                <th className="p-2 border-b">Notes</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Details</th>
              </tr>
            </thead>

            <tbody>
              {[...(appointments || [])]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // latest first
                .map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-muted/20">
                    <td className="p-2 border-b">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="p-2 border-b">
                      {appointment.doctor?.user?.name ?? "Unknown"}
                    </td>
                    <td className="p-2 border-b">
                      {appointment.doctor?.type ?? "General"}
                    </td>
                    <td className="p-2 border-b">
                      {appointment.notes ?? "No notes available"}
                    </td>
                    <td className="p-2 border-b truncate max-w-[200px]">
                      {appointment.description ?? "No description"}
                    </td>
                    <td className="p-2 border-b">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          appointment.status === "done"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="p-2 border-b text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            <Info className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                            <DialogDescription>
                              Full information for this medical record.
                            </DialogDescription>
                          </DialogHeader>

                          {selectedAppointment && (
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Date:</strong>{" "}
                                {new Date(selectedAppointment.date).toLocaleString()}
                              </p>
                              <p>
                                <strong>Doctor:</strong>{" "}
                                {selectedAppointment.doctor?.user?.name ?? "Unknown"}
                              </p>
                              <p>
                                <strong>Specialty:</strong>{" "}
                                {selectedAppointment.doctor?.type ?? "General"}
                              </p>
                              <p>
                                <strong>Status:</strong>{" "}
                                {selectedAppointment.status}
                              </p>
                              <p>
                                <strong>Notes:</strong>{" "}
                                {selectedAppointment.notes ?? "No notes available"}
                              </p>
                              <p>
                                <strong>Description:</strong>{" "}
                                {selectedAppointment.description ?? "No description"}
                              </p>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

// ----- Medical Records Component ----- //
// - Review [x] 
import { useState, useMemo } from "react"
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
import LoadingPills from "../ui/loading"

// ----- Props -----
interface MedicalRecordsProps {
  patientId: number | undefined
}

export function MedicalRecords({ patientId }: MedicalRecordsProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [filterDate, setFilterDate] = useState<string>("") // YYYY-MM-DD format

  // ----- Loading & empty states -----
  if (isLoading) return <LoadingPills message="Loading Medical Records..." />
  if (!appointments || appointments.length === 0)
    return <p className="text-muted-foreground">No medical records found.</p>

  // ----- Filter & sort appointments -----
  const filteredAppointments = useMemo(() => {
    let filtered = appointments.slice() // slice() ensures immutability
    if (filterDate) {
      filtered = filtered.filter(
        (a) => new Date(a.date).toISOString().split("T")[0] === filterDate
      )
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [appointments, filterDate])

  return (
    <Card className="border rounded shadow-none">
      {/* ----- Header ----- */}
      <CardHeader className="border-b-2 border-dotted pb-2">
        <CardTitle className="flex items-center gap-2 font-mono">
          <FileText className="w-5 h-5" />
          Medical Records
        </CardTitle>
        <CardDescription>
          Access your complete medical history and documents
        </CardDescription>
      </CardHeader>

      {/* ----- Filter Input ----- */}
      <div className="p-3 py-0  mx-3 text-end">
        <label className="text-sm font-medium mr-2 font-mono">By Date:</label>
        <input
          type="date"
          className="border rounded px-2 py-1 text-sm"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* ----- Table ----- */}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto text-sm font-mono">
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
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-2 text-center text-muted-foreground">
                    No records for selected date
                  </td>
                </tr>
              )}
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-muted/20">
                  <td className="p-2 border-b">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border-b">
                    {appointment.doctor?.user?.name ?? "Unknown"}
                  </td>
                  <td className="p-2 border-b">{appointment.doctor?.type ?? "General"}</td>
                  <td className="p-2 border-b max-w-40 truncate">{appointment.notes ?? "No notes available"}</td>
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

                  {/* ----- Details Dialog ----- */}
                  <td className="p-2 border-b text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex items-center shadow-none"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Info className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md font-mono">
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
                              <strong>Status:</strong> {selectedAppointment.status}
                            </p>
                            <p className="text-justify">
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

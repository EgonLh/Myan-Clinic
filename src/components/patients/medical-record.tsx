"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useGetAppointmentsByPatientQuery } from "@/app/store/features/appointment/appointmentApi"

interface MedicalRecordsProps {
  patientId: number | undefined
}

export function MedicalRecords({ patientId }: MedicalRecordsProps) {
  const { data: appointments, isLoading } = useGetAppointmentsByPatientQuery(patientId)

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
        <CardDescription>Access your complete medical history and documents</CardDescription>
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
                <th className="p-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...(appointments || [])]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // latest first
                .map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-muted/20">
                    <td className="p-2 border-b">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="p-2 border-b">{appointment.doctor?.user?.name ?? "Unknown"}</td>
                    <td className="p-2 border-b">{appointment.doctor?.type ?? "General"}</td>
                    <td className="p-2 border-b">{appointment.notes ?? "No notes available"}</td>
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

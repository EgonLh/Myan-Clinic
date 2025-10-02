"use client"

import * as React from "react"
import { useGetAppointmentsQuery } from "@/app/store/features/appointment/appointmentApi"
import { Appointment } from "@/types/appointment.type"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet"

export default function PatientHistoryPage() {
  const { data: appointments = [], isLoading, isError } = useGetAppointmentsQuery()
  
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>(undefined)
  const [typeFilter, setTypeFilter] = React.useState<string | undefined>(undefined)
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null)

  // Filter appointments
  const filteredData = appointments.filter((item: Appointment) => {
    const matchesSearch = item.patient?.user?.name?.toLowerCase().includes(search.toLowerCase()) || 
                          item.doctor?.user?.name?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter ? item.status === statusFilter : true
    const matchesType = typeFilter ? item.notes?.includes(typeFilter) : true
    return matchesSearch && matchesStatus && matchesType
  })

  // ---------------- Download Functions ----------------
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "patient_history.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadCSV = () => {
    const headers = ["Patient", "Doctor", "Date", "Notes", "Status"]
    const rows = filteredData.map((d) => [
      d.patient?.user?.name,
      d.doctor?.user?.name,
      d.date,
      d.notes ?? "N/A",
      d.status,
    ])
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "patient_history.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold">Patient History</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Patient/Doctor</Label>
          <Input
            id="search"
            placeholder="Enter patient or doctor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="statusFilter">Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="statusFilter" className="w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="typeFilter">Filter by Type</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger id="typeFilter" className="w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Consultation">Consultation</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
              <SelectItem value="Surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <Label className="sr-only">Download</Label>
          <Button onClick={downloadCSV} variant="outline" size="sm">Download CSV</Button>
          <Button onClick={downloadJSON} variant="outline" size="sm">Download JSON</Button>
        </div>
      </div>

      <Separator />

      {/* DataTable */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error fetching appointments.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((record: Appointment) => (
                <TableRow key={record.id}>
                  <TableCell>{record.patient?.user?.name}</TableCell>
                  <TableCell>{record.doctor?.user?.name}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.notes ?? "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "Completed" ? "default" : "outline"}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Sheet open={selectedAppointment?.id === record.id} onOpenChange={(open) => setSelectedAppointment(open ? record : null)}>
                      <SheetTrigger asChild>
                        <Button size="sm" variant="outline">View</Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto">
                        <SheetHeader>
                          <SheetTitle>Appointment Details</SheetTitle>
                          <SheetDescription>Details for {record.patient?.user?.name}</SheetDescription>
                        </SheetHeader>
                        <div className="p-4 flex flex-col gap-3">
                          <p><strong>Patient:</strong> {record.patient?.user?.name}</p>
                          <p><strong>Doctor:</strong> {record.doctor?.user?.name}</p>
                          <p><strong>Date:</strong> {new Date(record.date).toLocaleString()}</p>
                          <p><strong>Status:</strong> {record.status}</p>
                          <p><strong>Notes:</strong> {record.notes}</p>
                          <p><strong>Invoice:</strong> {record.invoice ?? "N/A"}</p>
                          <p><strong>Costs:</strong> {record.costs ?? "N/A"}</p>
                          <p><strong>Description:</strong> {record.description ?? "N/A"}</p>
                        </div>
                        <SheetFooter className="flex justify-end">
                          <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

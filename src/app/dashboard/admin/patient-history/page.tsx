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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function PatientHistoryPage() {
  const { data: appointments = [], isLoading, isError } = useGetAppointmentsQuery()

  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("All")
  const [dateFilter, setDateFilter] = React.useState<string>("All")
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null)

  // ✅ Date filter logic
  const isWithinDateFilter = (date: string): boolean => {
    const d = new Date(date)
    const now = new Date()

    if (dateFilter === "Today") return d.toDateString() === now.toDateString()
    if (dateFilter === "This Month")
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    if (dateFilter === "This Year") return d.getFullYear() === now.getFullYear()
    return true
  }

  // ✅ Filtered data
  const filteredData = appointments.filter((item: Appointment) => {
    const matchesSearch =
      item.patient?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor?.user?.name?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    const matchesDate = isWithinDateFilter(item.date)
    return matchesSearch && matchesStatus && matchesDate
  })

  // ✅ Downloads
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

  // ✅ Clear filters & reset dropdown UI
  const handleClearFilters = () => {
    setSearch("")
    setStatusFilter("All")
    setDateFilter("All")
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 font-mono">
      <h1 className="text-2xl font-bold">Patient History</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4 flex-wrap">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2">Search Patient / Doctor</Label>
          <Input
            id="search"
            placeholder="Enter patient or doctor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm border border-gray-300"
          />
        </div>

        {/* Status filter */}
        <div>
          <Label htmlFor="statusFilter" className="mb-2">Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="statusFilter" className="w-48 rounded-sm border border-gray-300">
              <SelectValue placeholder="All Status">{statusFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date filter */}
        <div>
          <Label htmlFor="dateFilter" className="mb-2">Filter by Date</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="dateFilter" className="w-48 rounded-sm border border-gray-300">
              <SelectValue placeholder="All Time">{dateFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Time</SelectItem>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button
            onClick={handleClearFilters}
            variant="destructive"
            size="sm"
            className="rounded-sm border border-gray-300"
          >
            Clear
          </Button>
          <Button
            onClick={downloadCSV}
            variant="outline"
            size="sm"
            className="rounded-sm border border-gray-300"
          >
            CSV
          </Button>
          <Button
            onClick={downloadJSON}
            variant="outline"
            size="sm"
            className="rounded-sm border border-gray-300"
          >
            JSON
          </Button>
        </div>
      </div>

      <Separator />

      {/* Table */}
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : isError ? (
        <p className="text-red-500">Error fetching appointments.</p>
      ) : (
        <div className="border border-dotted rounded-sm overflow-hidden">
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
                      <Sheet
                        open={selectedAppointment?.id === record.id}
                        onOpenChange={(open) => setSelectedAppointment(open ? record : null)}
                      >
                        <SheetTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-sm">
                            View
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="right"
                          className="w-full md:w-96 lg:w-[40vw] rounded-sm font-mono border-dotted border"
                        >
                          <SheetHeader>
                            <SheetTitle>Appointment Details</SheetTitle>
                            <SheetDescription>Details for {record.patient?.user?.name}</SheetDescription>
                          </SheetHeader>

                          <div className="p-4 mt-2 space-y-2 text-sm">
                            {[
                              ["Patient", record.patient?.user?.name],
                              ["Doctor", record.doctor?.user?.name],
                              ["Date", new Date(record.date).toLocaleString()],
                              ["Status", record.status],
                              ["Notes", record.notes ?? "N/A"],
                              ["Invoice", record.invoice ?? "N/A"],
                              ["Costs", record.costs ?? "N/A"],
                              ["Description", record.description ?? "N/A"],
                            ].map(([label, value]) => (
                              <div key={label} className="flex justify-between border-b border-dotted py-1">
                                <span className="text-gray-600">{label}:</span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>

                          <SheetFooter className="flex justify-end pt-4">
                            <SheetClose asChild>
                              <Button variant="outline" className="rounded-sm">
                                Close
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

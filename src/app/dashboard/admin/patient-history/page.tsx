"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Sample patient history data
const patientHistory = [
  { id: 1, patient: "John Doe", doctor: "Dr. Alice Smith", date: "2025-09-10", type: "Consultation", status: "Completed" },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Bob Jones", date: "2025-09-12", type: "Follow-up", status: "Pending" },
  { id: 3, patient: "John Doe", doctor: "Dr. Carol Lee", date: "2025-09-15", type: "Surgery", status: "Completed" },
]

export default function PatientHistoryPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>(undefined)
  const [typeFilter, setTypeFilter] = React.useState<string | undefined>(undefined)

  const filteredData = patientHistory.filter((item) => {
    const matchesSearch = item.patient.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter ? item.status === statusFilter : true
    const matchesType = typeFilter ? item.type === typeFilter : true
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
    const headers = ["Patient", "Doctor", "Date", "Type", "Status"]
    const rows = filteredData.map((d) => [d.patient, d.doctor, d.date, d.type, d.status])
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
          <Label htmlFor="search">Search Patient</Label>
          <Input
            id="search"
            placeholder="Enter patient name..."
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

        {/* Download Buttons */}
        <div className="flex gap-2 mt-2 md:mt-0">
          <Label className="sr-only">Download</Label>
          <Button onClick={downloadCSV} variant="outline" size="sm">
            Download CSV
          </Button>
          <Button onClick={downloadJSON} variant="outline" size="sm">
            Download JSON
          </Button>
        </div>
      </div>

      <Separator />

      {/* DataTable */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.patient}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>
                  <Badge variant={record.status === "Completed" ? "default" : "outline"}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => alert(`Viewing details for ${record.patient}`)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

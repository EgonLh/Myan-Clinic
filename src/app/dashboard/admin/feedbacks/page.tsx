"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Sample feedback data
const feedbackList = [
  { id: 1, patient: "John Doe", doctor: "Dr. Alice Smith", feedback: "Great service, very attentive.", date: "2025-09-10", rating: 5 },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Bob Jones", feedback: "Waiting time was long.", date: "2025-09-12", rating: 3 },
  { id: 3, patient: "Michael Brown", doctor: "Dr. Carol Lee", feedback: "Excellent care!", date: "2025-09-15", rating: 5 },
]

export default function FeedbackListPage() {
  const [search, setSearch] = React.useState("")

  const filteredData = feedbackList.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold">Patient Feedback</h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Feedback</Label>
          <Input
            id="search"
            placeholder="Search by patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Feedback Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.patient}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>{record.feedback}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge variant={record.rating >= 4 ? "default" : "outline"}>
                    {record.rating} ⭐
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert(`Viewing feedback from ${record.patient}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No feedback found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

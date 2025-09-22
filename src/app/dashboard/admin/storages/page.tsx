"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import jsPDF from "jspdf"

// Sample patient document data
const patientDocuments = [
  {
    id: 1,
    patient: "John Doe",
    diagnosis: "Diabetes Type 2",
    documents: ["Blood Test.pdf", "Prescription.pdf"],
    date: "2025-09-10",
  },
  {
    id: 2,
    patient: "Jane Smith",
    diagnosis: "Hypertension",
    documents: ["ECG Report.pdf", "Prescription.pdf"],
    date: "2025-09-12",
  },
  {
    id: 3,
    patient: "Michael Brown",
    diagnosis: "Allergy",
    documents: ["Allergy Test.pdf"],
    date: "2025-09-15",
  },
]

export default function DocumentStoragePage() {
  const [search, setSearch] = React.useState("")

  const filteredData = patientDocuments.filter((item) =>
    item.patient.toLowerCase().includes(search.toLowerCase())
  )

  const downloadPDF = (record: typeof patientDocuments[0]) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Patient: ${record.patient}`, 10, 20)
    doc.setFontSize(14)
    doc.text(`Diagnosis: ${record.diagnosis}`, 10, 40)
    doc.text(`Date: ${record.date}`, 10, 50)
    doc.setFontSize(12)
    doc.text("Documents:", 10, 70)
    record.documents.forEach((file, index) => {
      doc.text(`${index + 1}. ${file}`, 12, 80 + index * 10)
    })
    doc.save(`${record.patient.replace(" ", "_")}_record.pdf`)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold">Patient Document Storage</h1>

      {/* Search */}
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
      </div>

      <Separator />

      {/* DataTable */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.patient}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>
                  {record.documents.map((doc, i) => (
                    <Badge key={i} className="mr-1">
                      {doc}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => downloadPDF(record)}>
                    Download PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

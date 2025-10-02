"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import jsPDF from "jspdf"
import { IFile } from "@/types/file.type"
import { useGetFilesByStorageQuery } from "@/app/store/features/files/FileApi"
import { Patient } from "@/types/patient.type"
import { useGetPatientsQuery } from "@/app/store/features/patient/patientApi"

export default function DocumentStoragePage() {
  const [search, setSearch] = React.useState("")
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null)

  // ✅ Fetch patients including the user relation from backend
  const { data: patientsData, isLoading: isPatientsLoading } = useGetPatientsQuery()

  // ✅ Map Prisma Patient -> frontend Patient type
  const patients: Patient[] = (patientsData ?? []).map(p => ({
    id: p.id,
    name: p.user?.name ?? "",
    email: p.user?.email ?? "",
    phone: p.ph ?? "",
    dob: p.user?.dob ?? "",
    createdAt: p.user?.createdAt ?? "",
    updatedAt: p.user?.updatedAt ?? "",
  }))

  // ✅ Filter patients by search input
  const filteredPatients = patients.filter(p =>
    (p.name ?? "").toLowerCase().includes(search.toLowerCase())
  )

  // ✅ Fetch files for selected patient (using patient.id as storageId)
  const { data: files, isLoading: isFilesLoading } = useGetFilesByStorageQuery(1)

  console.log(files)
  const downloadPDF = () => {
    if (!selectedPatient || !files) return

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Patient: ${selectedPatient.name}`, 10, 20)
    doc.setFontSize(14)
    doc.text(`Email: ${selectedPatient.email}`, 10, 40)
    doc.text(`Phone: ${selectedPatient.phone}`, 10, 50)
    doc.text(`DOB: ${selectedPatient.dob}`, 10, 60)
    doc.setFontSize(12)
    doc.text("Documents:", 10, 80)

    files.forEach((file: IFile, index: number) => {
      doc.text(`${index + 1}. ${file.filename}`, 12, 90 + index * 10)
    })

    doc.save(`${selectedPatient.name.replace(/\s+/g, "_")}_record.pdf`)
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
      {isPatientsLoading ? (
        <div>Loading patients...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          View Files
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Documents for {patient.name}</DialogTitle>
                        </DialogHeader>
                        {isFilesLoading ? (
                          <div>Loading files...</div>
                        ) : files && files.length > 0 ? (
                          <div className="space-y-2 mt-4">
                            {files.map((file: IFile) => (
                              <div key={file.id} className="flex justify-between items-center">
                                <span>{file.filename}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    window.open(`http://localhost:3000/uploads/${file.filename}`, "_blank")
                                  }
                                >
                                  Download
                                </Button>
                              </div>
                            ))}
                            <Button className="mt-4" onClick={downloadPDF}>
                              Download All as PDF
                            </Button>
                          </div>
                        ) : (
                          <div className="mt-4">No documents found.</div>
                        )}
                      </DialogContent>
                    </Dialog>
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
      )}
    </div>
  )
}

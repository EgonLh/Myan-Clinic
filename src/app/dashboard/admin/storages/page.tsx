"use client"
// ----- Storage of Patients ----- //
// - Review [x]
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import jsPDF from "jspdf"
import { IFile } from "@/types/file.type"
import { useGetFilesByStorageQuery, useDownloadFileQuery } from "@/app/store/features/files/FileApi"
import { Patient } from "@/types/patient.type"
import { useGetPatientsQuery } from "@/app/store/features/patient/patientApi"
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi"

export default function DocumentStoragePage() {
  const [search, setSearch] = React.useState("")
  const [selectedPatient, setSelectedPatient] = React.useState<any | null>(null)
  const [selectedFileId, setSelectedFileId] = React.useState<number | null>(null)

  // Patients with related user info
  const { data: patientsData, isLoading: isPatientsLoading } = useGetPatientsQuery()

  const patients = (patientsData ?? []).map(p => ({
    id: p.id,
    name: p.user?.name ?? "",
    email: p.user?.email ?? "",
    phone: p.ph ?? "",
    createdAt: p.user?.createdAt ?? "",
    updatedAt: p.user?.updatedAt ?? "",
  }))

  //  Filtered patients
  const filteredPatients = patients.filter(p =>
    (p.name ?? "").toLowerCase().includes(search.toLowerCase())
  )

  //  Files for selected patient
  const { data: files, isLoading: isFilesLoading } = useGetStorageByPatientQuery(selectedPatient?.id ?? 0, {
    skip: !selectedPatient,
  })

  //  Single file download (via API)
  const { data: downloadedBlob } = useDownloadFileQuery(selectedFileId!, {
    skip: !selectedFileId,
  })

  React.useEffect(() => {
    if (downloadedBlob && selectedFileId !== null) {
      const url = URL.createObjectURL(downloadedBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `file_${selectedFileId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      setSelectedFileId(null) // reset selected file
    }
  }, [downloadedBlob])

  console.log("Selected Patient:", selectedPatient)
  //  Generate PDF of all file names
  const downloadPDF = () => {
    if (!selectedPatient || !files.length) return
    const doc = new jsPDF()
    doc.setFont("courier", "normal")
    doc.setFontSize(18)
    doc.text(`Patient Record: ${selectedPatient.name}`, 10, 20)

    doc.setFontSize(12)
    doc.text(`Email: ${selectedPatient.email}`, 10, 35)
    doc.text(`Phone: ${selectedPatient.phone}`, 10, 45)
    doc.text(`DOB: ${selectedPatient.createdAt}`, 10, 55)

    doc.setFontSize(14)
    doc.text("Documents:", 10, 75)
    const filesList = files[0]?.files || [];
    filesList.forEach((file: IFile, index: number) => {
      doc.text(`${index + 1}. ${file.log}`, 12, 90 + index * 10)
    })
    doc.save(`${selectedPatient.name.replace(/\s+/g, "_")}_documents.pdf`)
  }


  return (
    <div className="p-4 lg:p-6 space-y-4 font-mono">
      <h1 className="text-2xl font-bold">Patient Document Storage</h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-3">Search Patient</Label>
          <Input
            id="search"
            placeholder="Enter patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm shadow-none border max-w-80 border-gray-300"
          />
        </div>
      </div>

      <Separator />

      {/* Patient Table */}
      {isPatientsLoading ? (
        <div>Loading patients...</div>
      ) : (
        <div className="border border-dotted rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient?.name}</TableCell>
                    <TableCell>{patient?.email}</TableCell>
                    <TableCell>{patient?.phone}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            View Files
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="w-full max-w-lg rounded-sm border border-dotted font-mono">
                          <DialogHeader>
                            <DialogTitle>Documents for {patient.name}</DialogTitle>
                          </DialogHeader>

                          {isFilesLoading ? (
                            <div className="mt-4 text-sm text-gray-500">Loading files...</div>
                          ) : files && files.length > 0 ? (
                            <div className="mt-4 space-y-2">
                              {(files[0]?.files).map((file: IFile) => (
                                <div
                                  key={file.id}
                                  className="flex justify-between items-center border-b border-dotted py-1"
                                >
                                  <span>{file.filename}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-sm"
                                    onClick={() => setSelectedFileId(file.id)}
                                  >
                                    Download
                                  </Button>
                                </div>
                              ))}

                              <Button
                                onClick={downloadPDF}
                                className="w-full mt-4 rounded-sm"
                              >
                                Download Summary as PDF
                              </Button>
                            </div>
                          ) : (
                            <div className="mt-4 text-gray-500 text-sm">
                              No documents found.
                            </div>
                          )}

                          <DialogFooter className="flex justify-end pt-4">
                            <Button
                              variant="outline"
                              className="rounded-sm"
                              onClick={() => setSelectedPatient(null)}
                            >
                              Close
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
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

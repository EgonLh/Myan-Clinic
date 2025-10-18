import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Info, Trash2, Download, Upload } from "lucide-react"
import { useGetStorageByPatientQuery } from "@/app/store/features/storage/storageApi"
import { toast } from "sonner"
import { useAppDispatch } from "@/app/store/hook"
import { useDeleteFileMutation, useCreateFileMutation } from "@/app/store/features/files/FileApi"

interface PatientStorageProps {
  patientId: number | undefined
}

export function PatientStorage({ patientId }: PatientStorageProps) {
  const { data: storages, isLoading, refetch } = useGetStorageByPatientQuery(
    Number(patientId)
  )
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadLog, setUploadLog] = useState("")
  const dispatch = useAppDispatch()
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation()
  const [createFile, { isLoading: isUploading }] = useCreateFileMutation()
  console.log("user storage",storages)
  // 🔹 Download handler
  const handleDownload = async () => {
    if (!selectedFile) return
    try {
      const response = await fetch(
        `http://localhost:3000/files/${selectedFile.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (!response.ok) throw new Error("Download failed")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = selectedFile.filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success(`Downloading "${selectedFile.filename}"`)
    } catch (err) {
      console.error(err)
      toast.error("Failed to download file.")
    }
  }

  // 🔹 Delete handler

const handleDelete = async () => {
  if (!selectedFile) return
  const confirmed = window.confirm(
    `Are you sure you want to delete "${selectedFile.filename}"?`
  )
  if (!confirmed) return
  try {
    await deleteFile(selectedFile.id).unwrap() // ✅ calls API
    toast.success("File deleted successfully")
    setSelectedFile(null)
    refetch() // refresh storage list after deletion
  } catch (err) {
    console.error(err)
    toast.error("Error deleting file")
  }
}

  // 🔹 Upload handler
  const handleUpload = async () => {
    if (!uploadFile || !storages?.[0]) return
    try {
      await createFile({
        body: { storageId: storages[0].id, log: uploadLog },
        file: uploadFile,
      }).unwrap()
      toast.success("File uploaded successfully")
      setUploadFile(null)
      setUploadLog("")
      refetch()
    } catch (err) {
      console.error(err)
      toast.error("Failed to upload file")
    }
  }

  if (isLoading) return <p>Loading storage records...</p>
  if (!storages || storages.length === 0)
    return <p className="text-muted-foreground">No storage records found.</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Patient Storage
        </CardTitle>
        <CardDescription>View and manage uploaded patient files</CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Upload section */}
        <div className="mb-6 flex flex-col gap-2">
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
          />
          <input
            type="text"
            placeholder="Optional log or description"
            value={uploadLog}
            onChange={(e) => setUploadLog(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <Button
            onClick={handleUpload}
            disabled={isUploading || !uploadFile}
            className="w-max flex items-center gap-1"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>

        {storages.map((storage) => (
          <div key={storage.id} className="mb-6">
            <h3 className="font-semibold text-sm mb-2 text-muted-foreground">
              Patient #{storage.patientId} — {storage.patient?.condition ?? "Unknown condition"}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse table-auto text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="p-2 border-b">Filename</th>
                    <th className="p-2 border-b">Log</th>
                    <th className="p-2 border-b">Uploaded At</th>
                    <th className="p-2 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {storage.files && storage.files.length > 0 ? (
                    storage.files.map((file) => (
                      <tr key={file.id} className="hover:bg-muted/20">
                        <td className="p-2 border-b font-medium">{file.filename}</td>
                        <td className="p-2 border-b">{file.log ?? "—"}</td>
                        <td className="p-2 border-b">{new Date(file.createdAt).toLocaleString()}</td>
                        <td className="p-2 border-b text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedFile(file)}
                              >
                                <Info className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>File Details</DialogTitle>
                                <DialogDescription>
                                  Full information for this file
                                </DialogDescription>
                              </DialogHeader>

                              {selectedFile && (
                                <div className="space-y-3 text-sm">
                                  <p><strong>Filename:</strong> {selectedFile.filename}</p>
                                  <p><strong>Log:</strong> {selectedFile.log ?? "No log available"}</p>
                                  <p><strong>Created At:</strong> {new Date(selectedFile.createdAt).toLocaleString()}</p>
                                  <p><strong>Storage ID:</strong> {selectedFile.storageId}</p>
                                  <p><strong>Deleted:</strong> {selectedFile.deletedAt ? "Yes" : "No"}</p>

                                  <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={handleDownload}>
                                      <Download className="w-4 h-4 mr-1" />
                                      Download
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-muted-foreground">
                        No files uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

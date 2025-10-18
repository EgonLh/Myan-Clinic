import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdatePatientMutation } from "@/app/store/features/patient/patientApi";
import { useCreateFileMutation } from "@/app/store/features/files/FileApi";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";

export default function PatientDetailDialog({
  patient,
  appointments,
  storageData,
  formatDate,
  onClose,
  refetchStorage, // optional: pass a refetch function from parent
}: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [condition, setCondition] = useState(patient.condition || "");
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  // 🔹 Upload states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLog, setUploadLog] = useState("");
  const [createFile, { isLoading: isUploading }] = useCreateFileMutation();

  const handleSave = async () => {
    try {
      await updatePatient({ id: patient.id, body: { condition } }).unwrap();
      setIsEditMode(false);
      toast.success("Condition updated successfully");
    } catch (err) {
      console.error("Failed to update condition:", err);
      toast.error("Failed to update condition.");
    }
  };

  // 🔹 Download file handler
  const handleDownload = async (fileId: number, filename: string) => {
    try {
      const response = await fetch(`http://localhost:3000/files/${fileId}/download`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success(`Downloading "${filename}"`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download file.");
    }
  };

  // 🔹 Upload handler
  const handleUpload = async () => {
    if (!uploadFile || !storageData?.[0]) {
      toast.error("No file selected or storage unavailable");
      return;
    }

    try {
      await createFile({
        body: { storageId: storageData[0].id, log: uploadLog },
        file: uploadFile,
      }).unwrap();

      toast.success("File uploaded successfully");
      setUploadFile(null);
      setUploadLog("");

      // Refresh parent storage list if passed
      refetchStorage?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file");
    }
  };

  const conditionOptions = [
    "Good",
    "Stable",
    "Critical",
    "Recovered",
    "Under Observation",
    "Needs Attention",
  ];

  return (
    <div className="mt-4 font-mono space-y-3 text-xs">
      {/* Patient Basic Info */}
      {[["Patient", patient.user?.name || "N/A"],
        ["Age", patient.age || "N/A"],
        ["Gender", patient.user?.gender || "N/A"]].map(([label, value]) => (
        <div key={label} className="flex justify-between border-b pb-1">
          <span className="font-semibold">{label}:</span>
          <span>{value}</span>
        </div>
      ))}

      {/* Condition Field */}
      <div className="flex justify-between border-b pb-1 items-center">
        <span className="font-semibold">Condition:</span>
        {isEditMode ? (
          <select
            className="border rounded px-1 py-0.5 text-xs"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            {conditionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <span>{condition || "N/A"}</span>
        )}
      </div>

      {/* Appointment Notes */}
      <div className="mt-2">
        <h3 className="font-semibold text-sm">Appointments Notes:</h3>
        {appointments.length > 0 ? (
          appointments.map((appt: any) => (
            <div key={appt.id} className="border-b py-1 text-xs">
              <span className="font-semibold">{formatDate(appt.date)}:</span>{" "}
              {appt.notes || "No notes"}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-xs">No appointments found.</p>
        )}
      </div>

      {/* Storage Files */}
      <div className="mt-2">
        <h3 className="font-semibold text-sm">Files:</h3>

        {/* Upload Section */}
        <div className="flex flex-col sm:flex-row gap-2 mb-2 items-center">
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
            className="border px-1 py-0.5 text-xs"
          />
          <input
            type="text"
            placeholder="Optional log"
            value={uploadLog}
            onChange={(e) => setUploadLog(e.target.value)}
            className="border rounded px-1 py-0.5 text-xs flex-1"
          />
          <Button
            size="xs"
            variant="outline"
            onClick={handleUpload}
            disabled={!uploadFile || isUploading}
            className="flex items-center gap-1"
          >
            <Upload className="w-3 h-3" /> {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {storageData && storageData.length > 0 ? (
          storageData.map((storage: any) =>
            storage.files.map((file: any) => (
              <div
                key={file.id}
                className="border-b py-1 text-xs flex justify-between items-center"
              >
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => handleDownload(file.id, file.filename)}
                >
                  {file.filename}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px]">
                    {formatDate(file.createdAt)}
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleDownload(file.id, file.filename)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))
          )
        ) : (
          <p className="text-muted-foreground text-xs">No files uploaded.</p>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant={isEditMode ? "default" : "ghost"}
          size="sm"
          onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
          disabled={isUpdating}
        >
          {isEditMode ? (isUpdating ? "Saving..." : "Save Changes") : "Update"}
        </Button>

        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

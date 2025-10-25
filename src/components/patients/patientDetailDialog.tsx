import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdatePatientMutation } from "@/app/store/features/patient/patientApi";
import { useCreateFileMutation } from "@/app/store/features/files/FileApi";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";
import { useUpdateAppointmentMutation } from "@/app/store/features/appointment/appointmentApi";

export default function PatientDetailDialog({
  patient,
  appointments,
  storageData,
  formatDate,
  onClose,
  refetchStorage,
}: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [condition, setCondition] = useState(patient.condition || "");
  const [editedNotes, setEditedNotes] = useState(
    appointments.map((a: any) => ({ id: a.id, notes: a.notes || "" }))
  );
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();
  // 🔹 Upload states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLog, setUploadLog] = useState("");
  const [createFile, { isLoading: isUploading }] = useCreateFileMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  // ----- Save Hander ----- //
  const handleSave = async () => {
     const mergedAppointments = appointments.map((appt: any) => {
      const edited = editedNotes.find((n) => n.id === appt.id);
      return {
        id: appt.id,
        notes: `Appointment Log: ${appt.notes || "---"} , Doctor Notes: ${edited?.notes || ""}`,
      };
    });
    if(mergedAppointments.length>0){
      for (const appt of mergedAppointments) {
        try {
          await updateAppointment({ id: appt.id, body: { notes: appt.notes } }).unwrap();
        } catch (err) {
          console.error(`Failed to update appointment ${appt.id}:`, err);
          toast.error(`Failed to update appointment ${appt.id}.`);
        } 
    }

    console.log("Merged Appointments:", mergedAppointments);
    try {
      await updatePatient({ id: patient.id, body: { condition } }).unwrap();
      setIsEditMode(false);
      toast.success("Condition updated successfully");
    } catch (err) {
      console.error("Failed to update condition:", err);
      toast.error("Failed to update condition.");
    }
  };
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
  // ----- Handle appointment notes change -----
   const handleNoteChange = (id: number, value: string) => {
    setEditedNotes((prev: { id: number; }[]) =>
      prev.map((n: { id: number; }) => (n.id === id ? { ...n, notes: value } : n))
    );
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
    <div className="mt-4 font-mono space-y-3 w-full text-xs">
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
      <div className="mt-2 py-3 border-b">
        <h3 className="font-semibold text-sm">Appointments Notes:</h3>
        {appointments.length > 0 ? (
          appointments.map((appt: any) => (
            <div key={appt.id} className=" py-1 text-xs">
              <span className="font-semibold mb-2">{formatDate(appt.date)}:</span><br/>
              {isEditMode ? (
                <textarea
                  className="border rounded w-full mt-1 p-1 text-xs"
                  onChange={(e) =>
                    handleNoteChange(appt.id, e.target.value)
                  }
                />
              ) : (
                <span className="mt-1 text-slate-500 text-xs block whitespace-pre-wrap">
                  {appt.notes || "No notes"}
                </span>
              )}
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
        <div className="flex flex-col justify-center w-full  mb-2 items-end">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Files Log"
              value={uploadLog}
              onChange={(e) => setUploadLog(e.target.value)}
              className="border rounded w-2/4 px-1 py-0.5 text-xs "
            />
            <input
              type="file"
              onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
              className="border px-1 py-0.5 ms-1 w-2/4 rounded text-xs"
            />
          </div>

          <Button
            size="xs"
            variant="outline"
            onClick={handleUpload}
            disabled={!uploadFile || isUploading}
            className="flex items-center my-1 text-xs p-2 gap-1"
          >
            {isUploading ? "Uploading..." : "Upload"}
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
                  className="text-blue-600 truncate max-w-[100px] cursor-pointer hover:underline"
                  onClick={() => handleDownload(file.id, file.filename)}
                >
                  {file.filename}
                </span>
                <span
                  className=" truncate  text-[10px] max-w-[100px] cursor-pointer hover:underline">
                  {file.log || "No log"}
                  </span>
                <div className="flex items-center gap-2 ">
                  <span className="text-muted-foreground text-[10px] ">
                    {formatDate(file.createdAt)}
                  </span>
                  <Button
                    size="xs"
                    variant="link"
                    className="text-xs"
                    onClick={() => handleDownload(file.id, file.filename)}
                  >
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdatePatientMutation } from "@/app/store/features/patient/patientApi";

export default function PatientDetailDialog({ patient, appointments, storageData, formatDate, onClose }: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [condition, setCondition] = useState(patient.condition || "");
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  const handleSave = async () => {
    try {
      await updatePatient({ id: patient.id, body: { condition } }).unwrap();
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to update condition:", err);
      alert("Failed to update condition.");
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
      {[
        ["Patient", patient.user?.name || "N/A"],
        ["Age", patient.age || "N/A"],
        ["Gender", patient.user?.gender || "N/A"],
      ].map(([label, value]) => (
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
        {storageData && storageData.length > 0 ? (
          storageData.map((storage: any) =>
            storage.files.map((file: any) => (
              <div key={file.id} className="border-b py-1 text-xs flex justify-between">
                <span>{file.filename}</span>
                <span className="text-muted-foreground text-[10px]">{formatDate(file.createdAt)}</span>
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

"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi";
import { useGetPatientsQuery } from "@/app/store/features/patient/patientApi";
import {
  useGetAppointmentsByDoctorQuery,
  useCreateAppointmentMutation,
} from "@/app/store/features/appointment/appointmentApi";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
}

export function TaskForm({ isOpen, onClose, selectedDate }: TaskFormProps) {
  const { data: doctors = [] } = useGetDoctorsQuery();
  const { data: patients = [] } = useGetPatientsQuery();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const { data: appointmentsByDoctor = [] } = useGetAppointmentsByDoctorQuery(
    selectedDoctorId ? Number(selectedDoctorId) : 0,
    { skip: !selectedDoctorId }
  );
  const [createAppointment] = useCreateAppointmentMutation();
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      patient: "",
      doctor: "",
      date: selectedDate || "",
      time: "",
      type: "appointment",
      priority: "medium",
      description: "",
      notes: "",
      costs: "",
      status: "pending",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      // Patient validation
      const patientObj = patients.find(
        (p) => p.user.name.toLowerCase() === values.patient.toLowerCase()
      );
      if (!patientObj) {
        errors.patient = "Patient not found in database.";
      }

      // Doctor validation
      const doctorObj = doctors.find(
        (d) => d.user.name.toLowerCase() === values.doctor.toLowerCase()
      );
      if (!doctorObj) {
        errors.doctor = "Doctor not found in database.";
      }

      // Duplicate date/time validation
      if (selectedDoctorId && values.date && values.time) {
        const duplicate = appointmentsByDoctor.find(
          (appt) => appt.date === values.date && appt.time === values.time
        );
        if (duplicate) {
          errors.time = "Selected doctor is not available at this date/time.";
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      const doctorObj = doctors.find(
        (d) => d.user.name.toLowerCase() === values.doctor.toLowerCase()
      );
      const patientObj = patients.find(
        (p) => p.user.name.toLowerCase() === values.patient.toLowerCase()
      );

      if (!doctorObj || !patientObj) return;

      const body: any = {
        doctorId: doctorObj.id,
        patientId: patientObj.id,
        date : values.date,
        status:values.status,
        notes:values.notes,
        invoice:"",
        description:values.description,
        
      };

      if (invoiceFile) body.invoice = invoiceFile;

      try {
        await createAppointment(body).unwrap();
        onClose();
        formik.resetForm();
        setInvoiceFile(null);
      } catch (err: any) {
        alert(err.data?.message || "Failed to create appointment.");
      }
    },
  });

  const filteredPatients = patients.filter((p) =>
    p.user.name.toLowerCase().includes(formik.values.patient.toLowerCase())
  );

  const filteredDoctors = doctors.filter((d) =>
    d.user.name.toLowerCase().includes(formik.values.doctor.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Patient */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient *</Label>
            <Input
              id="patient"
              name="patient"
              value={formik.values.patient}
              onChange={formik.handleChange}
              placeholder="Search patient by name"
              list="patients-list"
              required
            />
            <datalist id="patients-list">
              {filteredPatients.map((p) => (
                <option key={p.id} value={p.user.name} />
              ))}
            </datalist>
            {formik.errors.patient && (
              <p className="text-red-500 text-sm">{formik.errors.patient}</p>
            )}
          </div>

          {/* Doctor */}
          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor *</Label>
            <Input
              id="doctor"
              name="doctor"
              value={formik.values.doctor}
              onChange={(e) => {
                formik.handleChange(e);
                const doctor = doctors.find(
                  (d) => d.user.name.toLowerCase() === e.target.value.toLowerCase()
                );
                setSelectedDoctorId(doctor ? doctor.id.toString() : null);
              }}
              placeholder="Search doctor by name"
              list="doctors-list"
              required
            />
            <datalist id="doctors-list">
              {filteredDoctors.map((d) => (
                <option key={d.id} value={d.user.name} />
              ))}
            </datalist>
            {formik.errors.doctor && (
              <p className="text-red-500 text-sm">{formik.errors.doctor}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                required
              />
              {formik.errors.time && (
                <p className="text-red-500 text-sm">{formik.errors.time}</p>
              )}
            </div>
          </div>

          {/* Type & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formik.values.type}
                onValueChange={(value) => formik.setFieldValue("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formik.values.priority}
                onValueChange={(value) => formik.setFieldValue("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter description"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              placeholder="Enter notes"
            />
          </div>

          {/* Costs */}
          <div className="space-y-2">
            <Label htmlFor="costs">Costs</Label>
            <Input
              id="costs"
              name="costs"
              type="number"
              value={formik.values.costs}
              onChange={formik.handleChange}
              placeholder="Enter costs"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formik.values.status}
              onValueChange={(value) => formik.setFieldValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoice */}
          <div className="space-y-2">
            <Label htmlFor="invoice">Invoice (file)</Label>
            <Input
              id="invoice"
              type="file"
              onChange={(e) =>
                setInvoiceFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

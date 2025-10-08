import { Doctor } from "./doctor.type"
import { Patient } from "./user.type"

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  patient: Patient;        // Full patient object with user info
  doctor: Doctor;          // Full doctor object with user info
  date: string;            // ISO date string
  time?: string;           // Optional time if stored separately
  type?: string;           // Appointment type (e.g., "Checkup", "Follow-up")
  status: "done" | "pending" | "cancelled";
  notes?: string;          // Optional notes for the appointment
  invoice?: string;        // Optional invoice file path
  costs?: number;          // Optional cost of the appointment
  description?: string;    // Optional description of appointment
  meetingLink?: string;    // Optional Jitsi/meeting link
  createdAt: string;
  updatedAt: string;
  duration : number
}

export interface CreateAppointmentRequest {
  patientId: number
  doctorId: number
  date: string
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  duration ?: number
  notes?: string
  invoice?: string
  costs?: number
  description?:string
}

export interface UpdateAppointmentRequest {
  date?: string
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Not_Started"
  notes?: string
  invoice?: File
  cost?: number
}
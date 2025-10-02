import { Doctor } from "./doctor.type"
import { Patient } from "./user.type"

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  patient: Patient
  doctor: Doctor
  date: string
  status: "done" | "pending" | "cancelled"
  notes?: string
  invoice?: string
  costs?: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CreateAppointmentRequest {
  patientId: number
  doctorId: number
  date: string
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  notes?: string
  invoice?: File
  cost?: number
}

export interface UpdateAppointmentRequest {
  date?: string
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  notes?: string
  invoice?: File
  cost?: number
}
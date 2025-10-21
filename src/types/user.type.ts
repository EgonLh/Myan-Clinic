// ----------------------
// User (Base model)

import { Appointment } from "./appointment.type"
import { CreatePatientRequest, Doctor } from "./doctor.type"

// ----------------------
export interface User {
  status: string
  gender: string
  id: number
  name: string
  username: string
  email: string
  password: string
  role: "Patient" | "Doctor" | "Root"
  createdAt: string
  updatedAt: string
  rating : number
  patient?: Patient
  doctor?: Doctor
  root?: Root
}
export interface CreateUserRequest {
  name: string
  username: string
  email: string
  password: string
  role: "Patient" | "Doctor" | "Root"
  rating:number
}

export interface UpdateUserRequest extends Partial<Omit<CreateUserRequest, "password">> {
  password?: string  // optional if you want to change password
}


// ----------------------
// Patient
// ----------------------
export interface Patient {
  id: number
  uid: number
  user: User
  ph: string
  addr: string
  appointments: Appointment[]
  payment?: string
  storage?: Storage
}



// ----------------------
// Root
// ----------------------
export interface Root {
  id: number
  uid: number
  user: User
}

// ----------------------
// Appointment
// ----------------------


// ----------------------
// Storage
// ----------------------

// ----------------------
// File
// ----------------------

// ----------------------
// Department
// ----------------------


// ----------------------
// Create / Update Requests
// ----------------------

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

export interface CreateAppointmentRequest {
  patientId: number
  doctorId: number
  date: string
  status: "done" | "pending" | "cancelled"
  notes?: string
  invoice?: string
  costs?: number
  description?: string
}

export interface UpdateAppointmentRequest extends Partial<CreateAppointmentRequest> {}


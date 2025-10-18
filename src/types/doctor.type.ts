

import { Department } from "./department.type"
import { Appointment,User } from "./user.type"

export interface Doctor {
  isActive: string
  id: number
  uid: number
  user: User
  ph: string
  license: string
  type: "Generalist" | "Specialist"
  schedule: Appointment[]
  departmentId: number
  department: Department
  createdAt: string
  updatedAt: string
}
export interface CreateDoctorRequest {
  uid: number
  ph: string
  license: string
  type: "Generalist" | "Specialist"
  departmentId: number
  isActive:Boolean
}

export interface UpdateDoctorRequest extends Partial<CreateDoctorRequest> {}

export interface CreatePatientRequest {
  uid: number
  ph: string
  addr: string
  payment?: string
}

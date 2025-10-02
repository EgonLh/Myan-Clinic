import { Doctor } from "./doctor.type"

export interface Department {
  [x: string]: any
  id: number
  name: string
  remark?: string
  description?: string
  doctors: Doctor[]
}
export interface CreateDepartmentRequest {
  name: string
  remark?: string
  description?: string
}



export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {}

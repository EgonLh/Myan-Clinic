import { IFile } from "./file.type"
import { Patient } from "./user.type"

export interface IStorage {
  id: number
  patientId: number
  patient: Patient
  files: IFile[]
}


export interface CreateStorageRequest {
  patientId: number
}

export interface UpdateStorageRequest extends Partial<CreateStorageRequest> {}


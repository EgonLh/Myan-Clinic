import { IStorage } from "./storage.type"

export interface IFile {
  id: number
  storageId: number
  storage: IStorage
  filename: string
  log?: string
  createdAt: string
  deletedAt?: string
}


export interface CreateFileRequest {
  storageId: number
  filename: string
  log?: string
}

export interface UpdateFileRequest extends Partial<CreateFileRequest> {}


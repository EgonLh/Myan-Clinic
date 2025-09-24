export interface StorageFile {
  id: number;
  patientId: number;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: string;
  deletedAt?: string | null;
  logs: Array<{
    action: string; // e.g. "upload", "delete", "view"
    timestamp: string;
    userId?: number;
  }>;
}

export interface CreateStorageFileRequest {
  patientId: number;
  file: File; // uploading actual file
}

export interface UpdateStorageFileRequest {
  filename?: string;
  deletedAt?: string | null;
}

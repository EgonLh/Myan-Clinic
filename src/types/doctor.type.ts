export interface Doctor {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  license: string; // file URL or code
  type: "Generalist" | "Specialist";
  schedule: string; // e.g., JSON or text
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  license: string;
  type: "Generalist" | "Specialist";
  schedule: string;
}

export interface UpdateDoctorRequest extends Partial<CreateDoctorRequest> {}

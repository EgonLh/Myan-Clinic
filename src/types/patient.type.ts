export interface Patient {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // date of birth
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

import { User } from "./user.type";

export interface Patient {
  condition: string;
  gender: string;
  age: string;
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // date of birth
  createdAt: string;
  updatedAt: string;
  user:User
}

export interface CreatePatientRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  condition : string;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

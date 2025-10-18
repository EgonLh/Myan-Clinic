import { User } from "./user.type";

export interface Patient {
  condition: string;
  gender: string;
  age: string;
  id: number;
  ph: string;
  addr: string;
  createdAt: string;
  updatedAt: string;
  user:User
}

  export interface CreatePatientRequest {
    ph: string;
    addr: string;
    age:Number
    payment?:string;
    condition : string;
  }

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

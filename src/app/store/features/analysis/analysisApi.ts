import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SummaryResponse {
  patientsCount: number;
  doctorsCount: number;
  appointmentsCount: number;
  storagesCount: number;
  filesCount: number;
}

export interface AppointmentsStatus {
  status: string;
  _count: { status: number };
}

export interface PatientsGrowth {
  month: string;
  count: number;
}

export interface DoctorsByDepartment {
  department: string;
  count: number;
}

export interface AppointmentsPerDoctor {
  doctorName: string;
  appointmentsCount: number;
}

export const analysisApi = createApi({
  reducerPath: "analysisApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // your backend URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // if you store JWT
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse, void>({
      query: () => "/analysis/summary",
    }),
    getAppointmentsStatus: builder.query<AppointmentsStatus[], void>({
      query: () => "/analysis/appointments-status",
    }),
    getPatientsGrowth: builder.query<PatientsGrowth[], void>({
      query: () => "/analysis/patients-growth",
    }),
    getDoctorsByDepartment: builder.query<DoctorsByDepartment[], void>({
      query: () => "/analysis/doctors-department",
    }),
    getAppointmentsPerDoctor: builder.query<AppointmentsPerDoctor[], void>({
      query: () => "/analysis/appointments-per-doctor",
    }),
  }),
});

export const {
  useGetSummaryQuery,
  useGetAppointmentsStatusQuery,
  useGetPatientsGrowthQuery,
  useGetDoctorsByDepartmentQuery,
  useGetAppointmentsPerDoctorQuery,
} = analysisApi;

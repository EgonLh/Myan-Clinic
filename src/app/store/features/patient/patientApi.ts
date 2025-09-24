import { CreatePatientRequest, Patient, UpdatePatientRequest } from "@/types/patient.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    // GET all patients
    getPatients: builder.query<Patient[], void>({
      query: () => "/patients",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Patient" as const, id })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),

    // GET one patient by id
    getPatientById: builder.query<Patient, number>({
      query: (id) => `/patients/${id}`,
      providesTags: (result, error, id) => [{ type: "Patient", id }],
    }),

    // CREATE patient
    createPatient: builder.mutation<Patient, CreatePatientRequest>({
      query: (body) => ({
        url: "/patients",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),

    // UPDATE patient
    updatePatient: builder.mutation<Patient, { id: number; body: UpdatePatientRequest }>({
      query: ({ id, body }) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Patient", id }],
    }),

    // DELETE patient
    deletePatient: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Patient", id },
        { type: "Patient", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;

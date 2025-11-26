import { CreateDoctorRequest, Doctor, UpdateDoctorRequest } from "@/types/doctor.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    // GET all doctors
    getDoctors: builder.query<Doctor[], void>({
      query: () => "/doctors",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Doctor" as const, id })),
              { type: "Doctor", id: "LIST" },
            ]
          : [{ type: "Doctor", id: "LIST" }],
    }),

    // GET one doctor by id
    getDoctorById: builder.query<Doctor, number>({
      query: (id) => `/doctors/${id}`,
      providesTags: (result, error, id) => [{ type: "Doctor", id }],
    }),

    // CREATE doctor
    createDoctor: builder.mutation<Doctor, CreateDoctorRequest>({
      query: (body) => ({
        url: "/doctors",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Doctor", id: "LIST" }],
    }),

    // UPDATE doctor
    updateDoctor: builder.mutation<Doctor, { id: number; body: UpdateDoctorRequest }>({
      query: ({ id, body }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Doctor", id }],
    }),

    // DELETE doctor
    deleteDoctor: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Doctor", id }, { type: "Doctor", id: "LIST" }],
    }),

    
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;

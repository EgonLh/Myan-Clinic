import { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from "@/types/appointment.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => "/appointments",
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Appointment" as const, id })),
            { type: "Appointment", id: "LIST" },
          ]
          : [{ type: "Appointment", id: "LIST" }],
    }),

    getAppointmentById: builder.query<Appointment, number>({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [{ type: "Appointment", id }],
    }),

    getAppointmentsByPatient: builder.query<Appointment[], number>({
      query: (patientId) => `/appointments/patient/${patientId}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Appointment" as const, id })),
            { type: "Appointment", id: "LIST" },
          ]
          : [{ type: "Appointment", id: "LIST" }],
    }),
    getAppointmentsByDoctor: builder.query<Appointment[], number>({
      query: (doctorId) => `/appointments/doctor/${doctorId}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Appointment" as const, id })),
            { type: "Appointment", id: "LIST" },
          ]
          : [{ type: "Appointment", id: "LIST" }],
    }),
    createAppointment: builder.mutation<Appointment, CreateAppointmentRequest>({
      query: (body) => ({
        url: "/appointments",
        method: "POST",
        body, // plain JSON
      }),
      invalidatesTags: [{ type: "Appointment", id: "LIST" }],
    }),
    uploadInvoiceByAppointmentId: builder.mutation<
      Appointment,
      { id: number; file: File }
    >({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("invoice", file); // matches FileInterceptor('invoice')

        return {
          url: `/appointments/${id}/upload-invoice`, // matches your @Patch route
          method: "PATCH",
          body: formData,
          // Note: do NOT set Content-Type here. The browser sets it automatically for FormData
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment", id },
        { type: "Appointment", id: "LIST" },
      ],
    }),

    updateAppointment: builder.mutation<
      Appointment,
      { id: number; body: Partial<UpdateAppointmentRequest> }
    >({
      query: ({ id, body }) => {
        if (!body) throw new Error("Body is required");

        // Determine if any value is a File/Blob, then use FormData
        const useFormData = Object.values(body).some(
          (value) => value instanceof File || value instanceof Blob
        );

        if (useFormData) {
          const formData = new FormData();
          Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value as any);
          });
          return { url: `/appointments/${id}`, method: "PATCH", body: formData };
        } else {
          // Simple JSON for normal updates
          return {
            url: `/appointments/${id}`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment", id },
        { type: "Appointment", id: "LIST" },
      ],
    }),


    deleteAppointment: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({ url: `/appointments/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Appointment", id },
        { type: "Appointment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsByPatientQuery,
  useGetAppointmentsByDoctorQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUploadInvoiceByAppointmentIdMutation
} = appointmentApi;

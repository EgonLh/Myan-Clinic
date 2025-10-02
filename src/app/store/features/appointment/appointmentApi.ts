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

    createAppointment: builder.mutation<Appointment, CreateAppointmentRequest>({
      query: (body) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined && value !== null) formData.append(key, value as any);
        });

        return { url: "/appointments", method: "POST", body: formData };
      },
      invalidatesTags: [{ type: "Appointment", id: "LIST" }],
    }),

    updateAppointment: builder.mutation<Appointment, { id: number; body: UpdateAppointmentRequest }>({
      query: ({ id, body }) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined && value !== null) formData.append(key, value as any);
        });
        return { url: `/appointments/${id}`, method: "PATCH", body: formData };
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
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;

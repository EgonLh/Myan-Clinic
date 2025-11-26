import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStorage, CreateStorageRequest, UpdateStorageRequest } from "@/types/storage.type";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Storage"],
  endpoints: (builder) => ({
    getStorages: builder.query<IStorage[], void>({
      query: () => "/storage",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Storage" as const, id })),
              { type: "Storage", id: "LIST" },
            ]
          : [{ type: "Storage", id: "LIST" }],
    }),

    getStorageById: builder.query<IStorage, number>({
      query: (id) => `/storage/${id}`,
      providesTags: (result, error, id) => [{ type: "Storage", id }],
    }),

    getStorageByPatient: builder.query<IStorage[], number>({
      query: (patientId) => `/storage/patient/${patientId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Storage" as const, id })),
              { type: "Storage", id: "LIST" },
            ]
          : [{ type: "Storage", id: "LIST" }],
    }),

    createStorage: builder.mutation<IStorage, CreateStorageRequest>({
      query: (body) => ({
        url: "/storage",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Storage", id: "LIST" }],
    }),

    updateStorage: builder.mutation<IStorage, { id: number; body: UpdateStorageRequest }>({
      query: ({ id, body }) => ({
        url: `/storage/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Storage", id }],
    }),

    deleteStorage: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/storage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Storage", id },
        { type: "Storage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetStoragesQuery,
  useGetStorageByIdQuery,
  useGetStorageByPatientQuery,
  useCreateStorageMutation,
  useUpdateStorageMutation,
  useDeleteStorageMutation,
} = storageApi;

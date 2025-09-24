import { CreateStorageFileRequest, StorageFile, UpdateStorageFileRequest } from "@/types/storageFile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Storage"],
  endpoints: (builder) => ({
    // GET all files for a patient
    getFilesByPatient: builder.query<StorageFile[], number>({
      query: (patientId) => `/storage/patient/${patientId}`,
      providesTags: (result, error, patientId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Storage" as const, id })),
              { type: "Storage", id: `PATIENT-${patientId}` },
            ]
          : [{ type: "Storage", id: `PATIENT-${patientId}` }],
    }),

    // GET single file
    getFileById: builder.query<StorageFile, number>({
      query: (id) => `/storage/${id}`,
      providesTags: (result, error, id) => [{ type: "Storage", id }],
    }),

    // UPLOAD file
    uploadFile: builder.mutation<StorageFile, CreateStorageFileRequest>({
      query: ({ patientId, file }) => {
        const formData = new FormData();
        formData.append("patientId", patientId.toString());
        formData.append("file", file);

        return {
          url: "/storage",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { patientId }) => [
        { type: "Storage", id: `PATIENT-${patientId}` },
      ],
    }),

    // UPDATE file metadata (rename, soft-delete, etc.)
    updateFile: builder.mutation<StorageFile, { id: number; body: UpdateStorageFileRequest }>({
      query: ({ id, body }) => ({
        url: `/storage/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Storage", id }],
    }),

    // DELETE file permanently
    deleteFile: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/storage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Storage", id }],
    }),
  }),
});

export const {
  useGetFilesByPatientQuery,
  useGetFileByIdQuery,
  useUploadFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = storageApi;

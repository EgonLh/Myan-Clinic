import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IFile, CreateFileRequest, UpdateFileRequest } from "@/types/file.type"

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token
      if (token) headers.set("authorization", `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ["File"],
  endpoints: (builder) => ({
    // 📂 GET all files
    getFiles: builder.query<IFile[], void>({
      query: () => "/files",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "File" as const, id })),
              { type: "File", id: "LIST" },
            ]
          : [{ type: "File", id: "LIST" }],
    }),

    // 📂 GET files by storageId
    getFilesByStorage: builder.query<IFile[], number>({
      query: (storageId) => `/files/storage/${storageId}/files`,
      providesTags: (result, error, storageId) => [{ type: "File", id: storageId }],
    }),

    // ➕ CREATE file (upload)
    createFile: builder.mutation<IFile, { body: CreateFileRequest; file: File }>({
      query: ({ body, file }) => {
        const formData = new FormData()
        formData.append("log", body.log)
        formData.append("storageId", String(body.storageId))
        formData.append("file", file) // Multer will parse this

        return {
          url: "/files",
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: [{ type: "File", id: "LIST" }],
    }),

    // ✏️ UPDATE file (metadata + optional upload)
    updateFile: builder.mutation<IFile, { id: number; body: UpdateFileRequest; file?: File }>({
      query: ({ id, body, file }) => {
        const formData = new FormData()
        if (body.log) formData.append("log", body.log)
        if (body.storageId) formData.append("storageId", String(body.storageId))
        if (file) formData.append("file", file)

        return {
          url: `/files/${id}`,
          method: "PATCH",
          body: formData,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "File", id }],
    }),

    // ❌ DELETE file
    deleteFile: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "File", id },
        { type: "File", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetFilesQuery,
  useGetFilesByStorageQuery,
  useCreateFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = fileApi

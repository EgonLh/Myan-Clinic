// app/store/features/department/departmentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateDepartmentRequest, UpdateDepartmentRequest, Department } from '@/types/department.type';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // assuming you store JWT in auth slice
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    // GET all departments
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'LIST' },
            ]
          : [{ type: 'Department', id: 'LIST' }],
    }),

    // GET department by ID
    getDepartment: builder.query<Department, number>({
      query: (id) => `/departments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Department', id }],
    }),

    // CREATE department
    createDepartment: builder.mutation<Department, CreateDepartmentRequest>({
      query: (body) => ({
        url: '/departments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Department', id: 'LIST' }],
    }),

    // UPDATE department
    updateDepartment: builder.mutation<Department, { id: number; body: UpdateDepartmentRequest }>({
      query: ({ id, body }) => ({
        url: `/departments/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Department', id }],
    }),

    // DELETE department
    deleteDepartment: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Department', id },
        { type: 'Department', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;

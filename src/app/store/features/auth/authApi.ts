import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: { id: number; email: string; role: string,user_id:string };
}

export interface RegisterRequest{
  name: string,
  username :string,
  email : string,
  password:string,
  role:"Root" | "Doctor" | "Patient"
}

export interface RegisterResponse{
  accessToke:string,
  user:{
    id: number; email: string; role: string
  }
}


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    me: builder.query<LoginResponse["user"], void>({
      query: () => "/auth/me",
    }),
    register:builder.mutation<RegisterResponse,RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    })
  }),
});

export const { useLoginMutation, useMeQuery , useRegisterMutation } = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Optional: define types
export interface AskQueryRequest {
  query: string;
}

export interface AskQueryResponse {
  answer: string; // adjust based on backend response
}

export interface UploadMedicineResponse {
  success: boolean;
  id: number;
  filename: string;
}

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AI_URL || "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 1️⃣ Upload Medicine File
    uploadMedicine: builder.mutation<UploadMedicineResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        
        return {
          url: "/medicine/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    // 2️⃣ Chatbot Ask
    askChatbot: builder.mutation<AskQueryResponse, AskQueryRequest>({
      query: (body) => ({
        url: "/chatbot/ask",
        method: "POST",
        body, // JSON automatically
      }),
    }),
  }),
});

export const { useUploadMedicineMutation, useAskChatbotMutation } = appApi;

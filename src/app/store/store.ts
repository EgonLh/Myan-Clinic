import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import doctorReducer from './features/doctor/doctorSlice'

import { authApi } from './features/auth/authApi'
import { doctorApi } from './features/doctor/doctorApi'
import { patientApi } from './features/patient/patientApi'
import { storageApi } from './features/storage/storageApi'
import { analysisApi } from './features/analysis/analysisApi'
import { userApi } from './features/users/userApi'
import { appointmentApi } from './features/appointment/appointmentApi'
import { departmentApi } from './features/department/departmentApi'
import { fileApi } from './features/files/FileApi'
import { appApi } from './features/ai-services/appApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [storageApi.reducerPath]: storageApi.reducer,
    [analysisApi.reducerPath]: analysisApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore non-serializable checks for RTK Query APIs (Blobs, FormData, etc.)
        ignoredActions: [
          'fileApi/executeQuery/fulfilled',
          'fileApi/executeMutation/fulfilled',
        ],
        ignoredPaths: [
          'fileApi.queries',
          'fileApi.mutations',
        ],
      },
    }).concat(
      authApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      storageApi.middleware,
      analysisApi.middleware,
      userApi.middleware,
      appointmentApi.middleware,
      departmentApi.middleware,
      fileApi.middleware,
      appApi.middleware
    ),
})

// 🧩 Strong typing
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

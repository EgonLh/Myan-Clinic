import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { authApi } from './features/auth/authApi'
import { doctorApi } from './features/doctor/doctorApi'
import { patientApi } from './features/patient/patientApi'
import { storageApi } from './features/storage/storageApi'
import { analysisApi } from './features/analysis/analysisApi'
import { userApi } from './features/users/userApi'
import { appointmentApi } from './features/appointment/appointmentApi'
import { departmentApi } from './features/department/departmentApi'
import { fileApi } from './features/files/FileApi'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]:doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [storageApi.reducerPath]: storageApi.reducer,
    [analysisApi.reducerPath]:analysisApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [appointmentApi.reducerPath]:appointmentApi.reducer,
    [departmentApi.reducerPath]:departmentApi.reducer,
    [fileApi.reducerPath]:fileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      storageApi.middleware,
      analysisApi.middleware,
      userApi.middleware,
      appointmentApi.middleware,
      departmentApi.middleware,
      fileApi.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

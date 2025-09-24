import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { authApi } from './features/auth/authApi'
import { doctorApi } from './features/doctor/doctorApi'
import { patientApi } from './features/patient/patientApi'
import { storageApi } from './features/storage/storageApi'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]:doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [storageApi.reducerPath]: storageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      storageApi.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

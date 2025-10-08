import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorState {
  id: number | null;
  name: string|null;
  data: any | null;     
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  id: null,
  name:"",
  data: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setDoctorData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    clearDoctor(state) {
      state.id = null;
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setDoctorId,
  setDoctorData,
  clearDoctor,
  setLoading,
  setError,
} = doctorSlice.actions;

export default doctorSlice.reducer;

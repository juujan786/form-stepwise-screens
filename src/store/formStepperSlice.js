// src/store/formStepperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  personal_info: {},
  address_info: {},
  loading: false,
  error: null,
};

const formStepperSlice = createSlice({
  name: "formStepper",
  initialState,
  reducers: {
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateData: (state, action) => {
      state[action.payload.current] = {
        ...state[action.payload.current],
        ...action.payload.data,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { goToStep, updateData, setLoading, setError } =
  formStepperSlice.actions;
export default formStepperSlice.reducer;

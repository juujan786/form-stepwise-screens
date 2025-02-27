// src/store/formStepperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {},
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
      state.formData = { ...state.formData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { goToStep, updateData, setLoading, setError } = formStepperSlice.actions;
export default formStepperSlice.reducer;

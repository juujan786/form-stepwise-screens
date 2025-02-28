// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import formStepperReducer from "./formStepperSlice";

const store = configureStore({
  reducer: {
    formStepper: formStepperReducer,
  },
});

export default store;

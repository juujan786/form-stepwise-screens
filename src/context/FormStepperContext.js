// src/context/FormStepperContext.js
import { createContext, useContext, useReducer } from "react";

const FormStepperContext = createContext();

const initialState = {
  currentStep: 1,
  formData: {},
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GO_TO_STEP":
      return { ...state, currentStep: action.payload };
    case "UPDATE_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function FormStepperProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormStepperContext.Provider value={{ state, dispatch }}>
      {children}
    </FormStepperContext.Provider>
  );
}

export function useFormStepper() {
  return useContext(FormStepperContext);
}

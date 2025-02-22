// App.js
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FormStepperProvider } from "./context/FormStepperContext";
import PersonalInfoForm from "./screens/PersonalInfoForm";
import AddressForm from "./screens/AddressForm";

function App() {
  return (
    <FormStepperProvider>
      <Router>
        <Routes>
          <Route path="/step/personal-info" element={<PersonalInfoForm />} />
          <Route path="/step/address" element={<AddressForm />} />
          <Route
            path="/"
            element={<Navigate to="/step/personal-info" replace />}
          />
        </Routes>
      </Router>
    </FormStepperProvider>
  );
}

export default App;

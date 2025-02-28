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
import Home from "./screens/Home";
import ContextPersonalInfo from "./screens/ContextPersonalInfo";
import ContextAddressInfo from "./screens/ContextAddressInfo";

function App() {
  return (
    <FormStepperProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            // element={<Navigate to="/step/personal_info" replace />}
            element={<Home />}
          />
          <Route path="/step/personal_info" element={<PersonalInfoForm />} />
          <Route path="/step/address_info" element={<AddressForm />} />
          <Route
            path="/context/personal_info"
            element={<ContextPersonalInfo />}
          />
          <Route
            path="/context/address_info"
            element={<ContextAddressInfo />}
          />
        </Routes>
      </Router>
    </FormStepperProvider>
  );
}

export default App;

import * as yup from "yup";
import { useFormContext, useWatch } from "react-hook-form";
import StepsLayout from "../components/StepsLayout";
import Input from "../form-components/Input";
import Select from "../form-components/Select";
import RadioInput from "../form-components/Radio";
import CheckboxInput from "../form-components/Checkbox";

const personalInfoSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  country: yup.string().required("Country is required"),
  city: yup.string().when("country", {
    is: (country) => country !== undefined,
    then: (schema) => schema.required("City is required"),
  }),
  skills: yup
    .array()
    .min(1, "Select at least one skill")
    .required("Skills are required"),
});

const countryOptions = ["Pakistan", "India", "England"];

const cityOptionsByCountry = {
  Pakistan: ["Karachi", "Lahore", "Islamabad"],
  India: ["Delhi", "Mumbai", "Bangalore"],
  England: ["London", "Manchester", "Birmingham"],
};

function FormFields() {
  const { control } = useFormContext();
  const selectedCountry = useWatch({ control, name: "country" });

  return (
    <>
      <Input label="Full Name" name="fullName" placeholder="Name" type="text" />
      <Input label="Email" name="email" placeholder="Email" type="email" />
      <Input label="Age" name="age" placeholder="Age" type="number" />
      
      <Select label="Country" name="country" placeholder="Select Country" options={countryOptions} />
      
      {selectedCountry && cityOptionsByCountry[selectedCountry] && (
        <Select label="City" name="city" placeholder="Select City" options={cityOptionsByCountry[selectedCountry]} />
      )}
      
      <CheckboxInput label="Tech Skills" name="skills" options={["JavaScript", "HTML", "CSS"]} />
    </>
  );
}

function PersonalInfoForm() {
  return (
    <StepsLayout
      title="Personal Information"
      current="personal-info"
      next="address"
      validationSchema={personalInfoSchema}
    >
      <FormFields />
    </StepsLayout>
  );
}

export default PersonalInfoForm;

// PersonalInfoForm.js (fixed)
import * as yup from "yup";
import StepsLayout from "../components/StepsLayout";
import Input from "../form-components/Input";
import Select from "../form-components/Select";
import RadioInput from "../form-components/Radio";
import CheckboxInput from "../form-components/Checkbox";

const personalInfoSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  city: yup
    .string()
    .oneOf(["Karachi", "Lahore", "Islamabad"], "Invalid city")
    .required("City is required"),
  skills: yup
    .array()
    .min(1, "Select at least one skill")
    .required("Skills are required"),
  age: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});

const genderOptions = ["Male", "Female", "Other"];
const cityOptions = ["Karachi", "Lahore", "Islamabad"];
const skillsOptions = ["JavaScript", "HTML", "CSS"];

function FormFields() {
  return (
    <>
      <Input label="Full Name" name="fullName" placeholder="Name" type="text" />
      <Input label="Email" name="email" placeholder="Email" type="email" />
      <Input label="Age" name="age" placeholder="Age" type="number" />
      <Select
        label="Gender"
        name="gender"
        placeholder="Gender"
        options={genderOptions}
      />
      <RadioInput label="City" name="city" options={cityOptions} />
      <CheckboxInput
        label="Tech Skills"
        name="skills"
        options={skillsOptions}
      />
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

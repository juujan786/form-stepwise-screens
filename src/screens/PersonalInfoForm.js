import * as yup from "yup";
import { useFormContext, useWatch } from "react-hook-form";
import StepsLayout from "../components/StepsLayout";
import Input from "../form-components/Input";
import Select from "../form-components/Select";
import RadioInput from "../form-components/Radio";
import CheckboxInput from "../form-components/Checkbox";
import { useSelector } from "react-redux";

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

const fields = [
  {
    label: "Full Name",
    name: "fullName",
    type1: "input",
    type: "text",
    placeholder: "Name",
    dependsOn: null,
  },
  {
    label: "Email",
    name: "email",
    type1: "input",
    type: "email",
    placeholder: "Email",
    dependsOn: "fullName",
  },
  {
    label: "Age",
    name: "age",
    type1: "input",
    type: "number",
    placeholder: "Age",
    dependsOn: null,
  },
  {
    label: "Country",
    name: "country",
    type1: "select",
    type: "text",
    placeholder: "Select Country",
    options: countryOptions,
    dependsOn: null,
  },
  {
    label: "City",
    name: "city",
    type1: "select",
    type: "text",
    placeholder: "Select City",
    options: [],
    dependsOn: "country",
  },
  {
    label: "Tech Skills",
    name: "skills",
    type1: "checkbox",
    type: "checkbox",
    options: ["JavaScript", "HTML", "CSS"],
    dependsOn: null,
  },
];

function FormFields() {
  const { control } = useFormContext();
  const [selectedCountry, fullName] = useWatch({
    control,
    name: ["country", "fullName"],
  });

  const watchedFields = {
    country: selectedCountry,
    fullName: fullName,
  };

  return (
    <>
      {fields?.map((field) => {
        if (field.dependsOn && !watchedFields[field.dependsOn]) {
          console.log("return: ", field.name, field.dependsOn);

          return null;
        }

        return (
          <>
            {field.type1 === "input" && !field.dependsOn && (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                // {...register(field.name)}
              />
            )}

            {field.type1 === "input" &&
              field.dependsOn &&
              watchedFields?.[field.dependsOn] && (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  // {...register(field.name)}
                />
              )}

            {field.type1 === "select" &&
              field.dependsOn &&
              watchedFields?.[field.dependsOn] && (
                <Select
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  options={
                    cityOptionsByCountry?.[watchedFields?.[field.dependsOn]]
                  }
                  // {...register(field.name)}
                />
              )}

            {field.type1 === "select" && !field.dependsOn && (
              <Select
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                options={field.options}
                // {...register(field.name)}
              />
            )}

            {field.type1 === "checkbox" && (
              <CheckboxInput
                key={field.name}
                label={field.label}
                name={field.name}
                options={field.options}
              />
            )}
          </>
        );
      })}
    </>
  );
}

function PersonalInfoForm() {
  const { personal_info } = useSelector((state) => state.formStepper);
  console.log("personal info rendered");

  async function saveFormData(data) {
    console.log("Saving data:", data);
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 1000)
    );
  }

  return (
    <StepsLayout
      title="Personal Information"
      current="personal_info"
      next="address_info"
      validationSchema={personalInfoSchema}
      formData={personal_info}
      saveFormData={saveFormData}
    >
      <FormFields />
    </StepsLayout>
  );
}

export default PersonalInfoForm;

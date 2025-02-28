import React from "react";
import Input from "../form-components/Input";
import Select from "../form-components/Select";
import CheckboxInput from "../form-components/Checkbox";

const countryOptions = ["Pakistan", "India", "England"];

const cityOptionsByCountry = {
  Pakistan: ["Karachi", "Lahore", "Islamabad"],
  India: ["Delhi", "Mumbai", "Bangalore"],
  England: ["London", "Manchester", "Birmingham"],
};
const ContextPersonalInfo = () => {
  const [selectedCountry, setSelectedCountry] = React.useState("");

  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  return (
    <>
      <Input label="Full Name" name="fullName" placeholder="Name" type="text" />
      <Input label="Email" name="email" placeholder="Email" type="email" />
      <Input label="Age" name="age" placeholder="Age" type="number" />
      <Select
        label="Country"
        name="country"
        placeholder="Select Country"
        options={countryOptions}
        onchange={onCountryChange}
      />
      {selectedCountry && cityOptionsByCountry[selectedCountry] && (
        <Select
          label="City"
          name="city"
          placeholder="Select City"
          options={cityOptionsByCountry[selectedCountry]}
        />
      )}
      <CheckboxInput
        label="Tech Skills"
        name="skills"
        options={["JavaScript", "HTML", "CSS"]}
      />
    </>
  );
};

export default ContextPersonalInfo;

import React from "react";
import { useFormContext } from "react-hook-form";

const Select = ({ label, options, name, placeholder, onChange }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="input-container">
      <div>
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <select
          {...register(name)}
          className="select"
          name={name}
          onChange={onChange}
        >
          <option defaultChecked value="">
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default Select;

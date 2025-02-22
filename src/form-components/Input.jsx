import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({ label, type, name, value, placeholder }) => {
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
        <input
          {...register(name)}
          className="input"
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default Input;

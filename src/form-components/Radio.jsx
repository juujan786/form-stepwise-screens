import React from "react";
import { useFormContext } from "react-hook-form";

const RadioInput = ({ label, name, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-container">
      <div>
        <label className="label">{label}</label>
        <div className="radio-options">
          {options.map((option) => (
            <label key={option} className="radio-option">
              <input
                {...register(name)}
                type="radio"
                value={option}
                className="radio-input"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default RadioInput;

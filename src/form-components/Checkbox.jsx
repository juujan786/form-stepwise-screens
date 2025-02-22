import React from "react";
import { useFormContext } from "react-hook-form";

const CheckboxInput = ({ label, name, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-container">
      <div>
        <label className="label">{label}</label>
        <div className="checkbox-options">
          {options.map((option) => (
            <label key={option} className="checkbox-option">
              <input
                {...register("skills", { required: "Select at least one" })}
                type="checkbox"
                value={option}
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

export default CheckboxInput;

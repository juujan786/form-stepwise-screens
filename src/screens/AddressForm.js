// AddressForm.js (fixed)
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import StepsLayout from "../components/StepsLayout";
import { useSelector } from "react-redux";

const addressSchema = yup.object({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
});

// Create a separate component for form fields
function FormFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <label>
          Street:
          <input {...register("street")} />
        </label>
        {errors.street && <p>{errors.street.message}</p>}
      </div>

      <div>
        <label>
          City:
          <input {...register("city")} />
        </label>
        {errors.city && <p>{errors.city.message}</p>}
      </div>
    </>
  );
}

function AddressForm() {
  const { address_info } = useSelector((state) => state.formStepper);

  async function saveFormData(data) {
    console.log("Saving data:", data);
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 1000)
    );
  }

  return (
    <StepsLayout
      title="Address Information"
      current="address_info"
      previous="personal_info"
      validationSchema={addressSchema}
      formData={address_info}
      saveFormData={saveFormData}
    >
      <FormFields />
    </StepsLayout>
  );
}

export default AddressForm;

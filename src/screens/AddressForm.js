// AddressForm.js (fixed)
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import StepsLayout from '../components/StepsLayout';

const addressSchema = yup.object({
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
});

// Create a separate component for form fields
function FormFields() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <>
      <div>
        <label>
          Street:
          <input {...register('street')} />
        </label>
        {errors.street && <p>{errors.street.message}</p>}
      </div>

      <div>
        <label>
          City:
          <input {...register('city')} />
        </label>
        {errors.city && <p>{errors.city.message}</p>}
      </div>
    </>
  );
}

function AddressForm() {
  return (
    <StepsLayout 
      title="Address Information" 
      current="address" 
      previous="personal-info"
      validationSchema={addressSchema}
    >
      <FormFields />
    </StepsLayout>
  );
}

export default AddressForm;
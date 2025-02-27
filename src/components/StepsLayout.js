// // StepsLayout.js (updated)
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate } from 'react-router-dom';
// import { useFormStepper } from '../context/FormStepperContext';
// import PropTypes from 'prop-types';

// const containerStyle = {
//   maxWidth: '800px',
//   margin: '0 auto',
//   padding: '2rem',
// };

// const buttonContainerStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginTop: '2rem',
// };

// async function saveFormData(data) {
//   console.log("Saving data:", data);
//   return new Promise(resolve => 
//     setTimeout(() => resolve({ success: true }), 1000)
//   );
// }

// function StepsLayout({ title, current, next, previous, children, validationSchema }) {
//   const methods = useForm({
//     resolver: validationSchema ? yupResolver(validationSchema) : undefined,
//     defaultValues: useFormStepper().state.formData
//   });

//   const { state, dispatch } = useFormStepper();
//   const navigate = useNavigate();

//   const handleNavigation = async (direction) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
    
//     try {
//       if (direction === 'next') {
//         const isValid = await methods.trigger();
//         if (!isValid) return;
        
//         // Update global form data
//         dispatch({ 
//           type: 'UPDATE_DATA', 
//           payload: methods.getValues()
//         });
//       }

//       await saveFormData(state.formData);

//       if (direction === 'next' && next) {
//         navigate(`/step/${next}`);
//       } else if (direction === 'next' && !next) {
//         // Final submission
//         console.log('Form submitted:', state.formData);
//       } else if (direction === 'prev') {
//         navigate(`/step/${previous}`);
//       }
//     } catch (error) {
//       dispatch({ type: 'SET_ERROR', payload: error.message });
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h1>{title}</h1>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(() => handleNavigation('next'))}>
//           {children}
          
//           <div style={buttonContainerStyle}>
//             <button
//               type="button"
//               onClick={() => handleNavigation('prev')}
//               disabled={current === "personal-info" || state.loading}
//             >
//               Previous
//             </button>
            
//             <button
//               type="submit"
//               disabled={state.loading}
//             >
//               {next ? 'Next' : 'Submit'}
//             </button>
//           </div>

//           {state.error && <p className="error">{state.error}</p>}
//           {state.loading && <p>Loading...</p>}
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// StepsLayout.propTypes = {
//   title: PropTypes.string.isRequired,
//   current: PropTypes.string.isRequired,
//   previous: PropTypes.string,
//   next: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   validationSchema: PropTypes.object,
// };

// export default StepsLayout;



import { useSelector, useDispatch } from "react-redux";
import { updateData, setLoading, setError } from "../store/formStepperSlice";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

async function saveFormData(data) {
  console.log("Saving data:", data);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
}

function StepsLayout({ title, current, next, previous, children, validationSchema }) {
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector((state) => state.formStepper);
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: formData,
  });
  const navigate = useNavigate();

  const handleNavigation = async (direction) => {
    dispatch(setLoading(true));

    try {
      if (direction === "next") {
        const isValid = await methods.trigger();
        if (!isValid) return;

        dispatch(updateData(methods.getValues()));
      }

      await saveFormData(formData);

      if (direction === "next" && next) {
        navigate(`/step/${next}`);
      } else if (direction === "prev" && previous) {
        navigate(`/step/${previous}`);
      } else if (direction === "next" && !next) {
        console.log("Form submitted:", formData);
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>{title}</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => handleNavigation("next"))}>
          {children}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
            <button type="button" onClick={() => handleNavigation("prev")} disabled={current === "personal-info" || loading}>
              Previous
            </button>

            <button type="submit" disabled={loading}>
              {next ? "Next" : "Submit"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
          {loading && <p>Loading...</p>}
        </form>
      </FormProvider>
    </div>
  );
}

StepsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  previous: PropTypes.string,
  next: PropTypes.string,
  children: PropTypes.node.isRequired,
  validationSchema: PropTypes.object,
};

export default StepsLayout;


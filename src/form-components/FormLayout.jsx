import React from 'react';

const FormLayout = ({ children, title, next = "Next", prev = "Previous", submitForm = () => {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit triggered from FormLayout");
    submitForm(); // Call the function from parent
  };

  return (
    <div className="layout-container">
      <form className="form" onSubmit={handleSubmit}>
        {/* Title */}
        <h1 className="title">{title}</h1>
        <hr /> {/* Line below title */}

        {/* Content Fields */}
        <div className="fields-container">{children}</div>

        {/* Buttons */}
        <div className="btns">
          {/* <button className="btn-prev" type="button">{prev}</button> */}
          <input className="btn-next" type="submit" value={next} />
        </div>
      </form>
    </div>
  );
};

export default FormLayout;

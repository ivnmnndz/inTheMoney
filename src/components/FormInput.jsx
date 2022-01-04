import React from "react";

const FormInput = (props) => {
  const { label, className, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <>
      <label>
        <span>{label}</span>
        <input {...inputProps} onChange={onChange}/>
        <span className={className}>{errorMessage}</span>
      </label>
    </>
  );
};

export default FormInput;

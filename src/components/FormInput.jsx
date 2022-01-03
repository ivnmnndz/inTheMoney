import React, { useState } from "react";

const FormInput = (props) => {
  const [isBlur, setIsBlur] = useState(false);
  const { label, errorMessage, handleChange, id, ...inputProps } = props;
  const handleBlur = (e) => {
    setIsBlur(true);
  };
  return (
    <>
      <label style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start"}}>
        <span>{label}</span>
        <input {...inputProps} onChange={handleChange} onBlur={handleBlur} focused={isBlur.toString()}/>
        <span>{errorMessage}</span>
      </label>
    </>
  );
};

export default FormInput;

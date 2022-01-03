import React, { useState } from "react";

const FormInput = (props) => {
  const [isBlur, setIsBlur] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleBlur = (e) => {
    setIsBlur(true);
  };
  return (
    <>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "start",
          margin: "15px"
        }}
      >
        <span>{label}</span>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleBlur}
          focused={isBlur.toString()}
        />
        <span style={{color: "red", fontSize: "10px"}}>{errorMessage}</span>
      </label>
    </>
  );
};

export default FormInput;

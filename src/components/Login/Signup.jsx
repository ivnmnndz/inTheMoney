import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail, updateAuthProfile } from "../../firebase/auth";
import { addUserDoc } from "../../firebase/db";
import FormInput from "../FormInput";

const Signup = () => {
  const [signupValues, setSignupValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await registerWithEmail(
      signupValues.email,
      signupValues.password
    );
    updateAuthProfile({ displayName: signupValues.userName });
    const data = {
      displayName: signupValues.userName,
      email: signupValues.email,
      uid: user.uid,
    };
    await addUserDoc(user.uid, data);
    navigate("/");
  };

  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      label: "User Name",
      placeholder: "User Name",
      pattern: "^[A-Za-z0-9]{3,15}$",
      errorMessage: "User name should be between 3-15 characters.",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email.",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      pattern: "^[a-zA-Z0-9]{6,15}$",
      errorMessage: "Password should be between 6-15 characters long.",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      pattern: signupValues.password,
      errorMessage: "Passwords do not match.",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setSignupValues({
      ...signupValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={signupValues[input.name]}
              onChange={handleChange}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;

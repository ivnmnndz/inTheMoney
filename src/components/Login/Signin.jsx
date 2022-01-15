import React, { useState, useContext } from "react";
import { signInWithEmail } from "../../firebase/auth";
import "../../css/signin.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthState";
import FormInput from "../FormInput";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { setIsLoading } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signInWithEmail(values.email, values.password);
    setIsLoading(false);
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const inputs = [
    {
      id: 1,
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      value: values.email,
      // className: validEmail ? "hide" : "show",
      // errorMessage: "",
      required: true,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Password",
      value: values.password,
      // className: validUserName ? "hide" : "show",
      // errorMessage: "",
      required: true,
    },
  ];

  return (
    <div className="signup-container">
      <div className="blockchain"></div>
      <form onSubmit={handleSignin} className="signup-form">
        <h1>Sign in</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} onChange={handleInputChange} />
        ))}
        <button className="signin-btn" type="submit">
          Sign in
        </button>
        <a href="/forgot_password">Forgot your password?</a>
      </form>
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail, updateAuthProfile } from "../../firebase/auth";
import { addUserDoc } from "../../firebase/db";
import FormInput from "../FormInput";

const Signup = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validUserName, setValidUserName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmation, setValidConfirmation] = useState(true);

  let navigate = useNavigate();

  const CreateUser = async (e) => {
    const user = await registerWithEmail(values.email, values.password);
    updateAuthProfile({ displayName: values.userName });
    const data = {
      displayName: values.userName,
      email: values.email,
      uid: user.uid,
    };
    await addUserDoc(user.uid, data);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validPassword =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$/;
    if (
      values.email.match(validEmail) &&
      values.password.match(validPassword) &&
      values.password === values.confirmPassword &&
      values.userName.length >= 6
    ) {
      console.log("Valid email address!");
      CreateUser();
    }
    if (!values.email.match(validEmail)) {
      setValidEmail(false);
    }
    if (values.email.match(validEmail)) {
      setValidEmail(true);
    }
    if (values.confirmPassword !== values.password) {
      setValidConfirmation(false);
    }
    if (values.password === values.confirmPassword) {
      setValidConfirmation(true);
    }
    if (!values.password.match(validPassword)) {
      setValidPassword(false);
    }
    if (values.password.match(validPassword)) {
      setValidPassword(true);
    }
    if (values.userName.length < 6) {
      setValidUserName(false);
    }
    if (values.userName.length >= 6) {
      setValidUserName(true);
    }
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
      type: "text",
      name: "userName",
      label: "User Name",
      placeholder: "User Name",
      value: values.userName,
      className: validUserName ? "hide" : "show",
      errorMessage: "The username must be at least 6 characters",
      required: true,
    },
    {
      id: 2,
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      value: values.email,
      className: validEmail ? "hide" : "show",
      errorMessage: "The email you have entered is invaild",
      required: true,
    },
    {
      id: 3,
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Password",
      value: values.password,
      className: validPassword ? "hide" : "show",
      errorMessage:
        "The password length must be at least 8 characters, must contain at least 1 uppercase and lowercase character, one or more numeric values, and one or more special characters.",
      required: true,
    },
    {
      id: 4,
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      value: values.confirmPassword,
      className: validConfirmation ? "hide" : "show",
      errorMessage: "Passwords do not match",
      required: true,
    },
  ];

  return (
    <>
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Create an Account</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} onChange={handleInputChange} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;

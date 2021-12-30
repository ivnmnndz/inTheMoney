import React, { useState } from "react";
import { Link } from "react-router-dom";
import {passwordReset} from "../firebase/auth"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(email)
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  console.log("email: ", email);

  //todo enter an email for firebase auth password reset/recovery
  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot your password?</h1>
      <label>
        Enter your email
        <input type="email" onChange={handleChange} />
      </label>
      <button type="submit">Recover Password</button>
      <Link to="/">
        <button>Go back Home</button>
      </Link>
    </form>
  );
};

export default ForgotPassword;

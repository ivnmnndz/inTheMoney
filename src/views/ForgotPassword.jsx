import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { passwordReset } from "../firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(email);
    setEmail("");
    navigate("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <h1>Forgot your password?</h1>
      <label>
        Enter your email:
        <input className="forgot-email" type="email" onChange={handleChange} />
      </label>
      <button type="submit">Recover Password</button>
      <Link to="/">Go back Home</Link>
    </form>
  );
};

export default ForgotPassword;

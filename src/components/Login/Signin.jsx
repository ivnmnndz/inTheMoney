import React, { useState } from "react";
import { signInWithEmail } from "../../firebase";
import "../../css/signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    signInWithEmail(email, password);
  };

  return (
    <div className="signup-container">
      <div className="blockchain"></div>
      <form onSubmit={handleSignin} className="signup-form">
        <h1>Sign in</h1>

        <input
          className="signup-email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          className="signup-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signin-btn" type="submit">
          Sign in
        </button>
        <a href="/">Forgot your password?</a>
      </form>
    </div>
  );
};

export default Signin;

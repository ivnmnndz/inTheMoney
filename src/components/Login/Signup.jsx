import React, { useState } from "react";
import { registerWithEmail } from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerWithEmail(email, password);
  };

  return (
    <>
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSubmit} className="signup-form">
        <h1>Create an Account</h1>
          <input
            className="signup-email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            name="password"
            className="signup-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;

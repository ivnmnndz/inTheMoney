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
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Create an Account</h1>
          <label>
            Email
            <input className="signup-email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input name="password" className="signup-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </label>
        <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;

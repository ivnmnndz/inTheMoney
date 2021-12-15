import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../../firebase/auth";
import { addUserDoc } from "../../firebase/db";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await registerWithEmail(email, password);
    await addUserDoc( user.uid, { displayName: userName, email: email, uid: user.uid } );
    navigate("/");
  };

  return (
    <>
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Create an Account</h1>
          <input
            className="signup-input"
            name="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
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

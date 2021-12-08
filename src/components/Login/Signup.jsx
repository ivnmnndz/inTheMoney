import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import background from "../../images/background.png";
import "../../css/signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const { setState, state } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <div className="signup-container" src={background}>
        <form onSubmit={handleSubmit} className="signup-form">
          {/* <label>
            Full Name
            <input className="signup-name" name="email" />
          </label> */}
          <h1>Create an Account</h1>
          <label>
            Email
            <input className="signup-email" name="email" onChange={(e)=>setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input name="password" className="signup-password" onChange={(e)=>setPassword(e.target.value)} />
          </label>
        <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default Signup;

import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Signup = () => {
  const { setState } = useContext(GlobalContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault;
    setState(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input className="border-black rounded-md" name="email" type="text" />
        </label>

        <label>
          Password
          <input name="password" type="text" />
        </label>
      </form>
    </>
  );
};
export default Signup;

<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useState, useContext } from "react";
>>>>>>> 870d27aa91c7e8f5db09f17a8060a9ccae662a00
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
      <form>
        <label>
          Email
          <input className="border-black rounded-md" name="email" />
        </label>

        <label>
          Password
          <input name="password" />
        </label>
      </form>
      <div>{state}</div>
    </>
  );
};
export default Signup;

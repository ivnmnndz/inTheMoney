import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Signup = () => {
  const { state } = useContext(GlobalContext);
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

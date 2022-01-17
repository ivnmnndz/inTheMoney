import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>Page Not Found, 404!</h1>
      <Link to="/dashboard">
        <button>Go back home</button>
      </Link>
    </>
  );
};

export default NotFound;

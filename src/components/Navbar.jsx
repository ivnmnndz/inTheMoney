import React from "react";
import "../css/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="logo">💰</Link>
      </div>
      <div className="login-signup">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

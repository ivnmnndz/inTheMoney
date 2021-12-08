import React from "react";
import "../css/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
     <div className="nav-links">
        <Link id='nav-link' to="/" className="logo">💰</Link>
     
 </div>
      <div className="login-signup">
        <Link id='nav-link'to="/login">Log In</Link>
        <Link id='nav-link'to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

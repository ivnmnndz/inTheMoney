import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from 'react-router-dom';
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase";

const Navbar = () => {
 const { currentUser } = useContext(GlobalContext);
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="logo">💰</Link>
      </div>
      <div className="login-signup">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      
      {currentUser ? <><div>{currentUser.email}</div>
      <button onClick={logout}>LOGOUT</button></>
       : null}
    </nav>
  );
};

export default Navbar;

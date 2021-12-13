import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase/auth";

const Navbar = () => {
  const { currentUser } = useContext(GlobalContext);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        {/* inline style here, expecting to replace with an svg? */}
        <Link to="/">
          <span>In the Money</span>
        </Link>{" "}
        {/* Theme toggler  */}
        {/* <input type="checkbox" className="checkbox" id="chk" />
        <label className="label" htmlFor="chk">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball"></div>
        </label> */}
      </div>
      {/* Hambuger toggler- (only shows under 600px) */}
      <input id="toggle1" type="checkbox" />
      <label className="hamburger1" htmlFor="toggle1">
        <div className="top"></div>
        <div className="meat"></div>
        <div className="bottom"></div>
      </label>

      {currentUser ? (
        <div className="nav-right">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          {/* icon for a potential dropdown menu */}
          {/* <div className="nav-link">
            <i className="far fa-user-circle fa-lg"></i>
          </div> */}

          <Link className="nav-link" to="/profile">
            {currentUser.email}
          </Link>
          <Link className="nav-link" to="/" onClick={logout}>
            <span>Logout</span>
          </Link>
        </div>
      ) : (
        <div className="nav-right">
          <Link className="nav-link" to="/login">
            <span>Log In</span>
          </Link>
          <Link className="nav-link" to="/signup">
            <span>Sign Up</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

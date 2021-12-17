import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthState";
import { logout } from "../firebase/auth";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  let navigate = useNavigate();
  
  const handleLogOut = () => {
    logout();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
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
      {/* Hamburger toggler- (only shows under 600px) */}
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
          <Link className="nav-link" to="/profile">
            {currentUser.displayName}
          </Link>
          <Link className="nav-link" to="/" onClick={handleLogOut}>
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

import React, { useContext} from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase";


const Navbar = () => {
  const { currentUser } = useContext(GlobalContext);


  



  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link className="nav-logo" to="/">
            💰
          </Link>
        </div>

        <div className="login-signup">
          <input  type="checkbox" class="checkbox" id="chk" />
          <label class="label" for="chk">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div class="ball"></div>
          </label>
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </div>

        {currentUser ? (
          <>
            <div>{currentUser.email}</div>
            <button onClick={logout}>LOGOUT</button>
          </>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;

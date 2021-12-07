import React from 'react'
import "../css/Navbar.css";

const Navbar = () => {
  return (
<nav className="navBar">
   
    <div className="NavBarDiv">
 
      <div>Logo</div>
    
      <a href="">Home</a>
   
    </div>
    <div className="LogInSignUpDiv" >
    <a href="">LogIn</a>
   
      <a href="">SignUp</a>
    </div>

</nav>
  )
}

export default Navbar

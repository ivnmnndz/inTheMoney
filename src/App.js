import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD:src/Layout.js
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import "./css/index.css"


const Layout = () => {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
   
  );
=======
import Navbar from './components/Navbar';
import Home from './views/Home'
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';
import Profile from './views/Profile';

const App = () => {

	return (
			<BrowserRouter>
				<Navbar />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
			</BrowserRouter>
	);
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91:src/App.js
};

export default App;

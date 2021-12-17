import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Profile from "./views/Profile";
import { getUserDoc } from "./firebase/db";
import { AuthContext } from "./context/AuthState";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchSingleUser = async () => {
      if (currentUser) {
        const user = await getUserDoc(currentUser.uid);
        console.log(user);
        setUserDetails(user);
      } else {
        console.log("no user yet");
      }
    };
    fetchSingleUser();
  }, []);

  console.log("user details state: ", userDetails);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

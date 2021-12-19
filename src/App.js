import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Profile from "./views/Profile";
import { getUserDoc } from "./firebase/db";
import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { currentUser, setIsLoading } = useContext(GlobalContext);
  const [userDetails, setUserDetails] = useState({});

  // this works, how should it really look?
  const get = async () => {
    if (currentUser) {
      const user = await getUserDoc(currentUser.uid);
      console.log(user);
       setIsLoading(false);
    } else {
      console.log("no user yet");
    }
  };
  get();

  //infinite loop below

  // 	async function fetch() {
  // 		if (currentUser) {
  // 			const user = await getUserDoc(currentUser.uid);
  // 			console.log(user);
  // 			setUserDetails(user)
  // 		} else {
  // 			console.log('no user yet')
  // 		}
  // 	}
  // 	useEffect(() => {
  // 		fetch();
  // 	})
  //
  // console.log("user details state: ",userDetails);

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

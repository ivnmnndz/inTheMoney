import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import HomePageNull from "../components/Home/HomePageNull";
import { GlobalContext } from "../context/GlobalState";
const Home = () => {
  const { currentUser } = useContext(GlobalContext);
  return currentUser ? <Dashboard /> : <HomePageNull />;
};

export default Home;

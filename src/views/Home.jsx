import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import LoggedOutHome from "../components/Home/LoggedOutHome";
import { GlobalContext } from "../context/GlobalState";
const Home = () => {
  const { currentUser } = useContext(GlobalContext);
  return currentUser ? <Dashboard /> : <LoggedOutHome />;
};

export default Home;

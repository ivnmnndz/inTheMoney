import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import LoggedOutHome from "../components/Home/LoggedOutHome";
import { GlobalContext } from "../context/GlobalState";
const Home = () => {
<<<<<<< HEAD
  return <Dashboard />;
=======
  const { currentUser } = useContext(GlobalContext);
  return currentUser ? <Dashboard /> : <LoggedOutHome />;
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91
};

export default Home;

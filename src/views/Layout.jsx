import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
      <Outlet />
      {/* <footer>footer component</footer> */}
      </main>
    </>
  );
};

export default Layout;

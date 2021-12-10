import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { GlobalProvider } from "./context/GlobalState";
import "./css/index.css";

ReactDOM.render(
  <GlobalProvider>
    <Layout />
  </GlobalProvider>,
  document.getElementById("root")
);

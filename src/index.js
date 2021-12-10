import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import Layout from "./Layout";
import { GlobalProvider } from "./context/GlobalState";
import "./css/index.css";
=======
import App from "./App";
import { GlobalProvider } from "./context/GlobalState"
import "./css/index.css"
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import MLSearchApp from "./components/refactor/MLSearchApp";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <MLSearchApp />
  </Router>,
  document.getElementById("root")
);

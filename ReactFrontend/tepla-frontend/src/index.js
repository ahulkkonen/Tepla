import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap

import Topic from "./components/topic";

// To-do Fetch topics and render them
ReactDOM.render(
  <Topic title="CLI" summary="Command Line Interface" />,
  document.getElementById("root")
);

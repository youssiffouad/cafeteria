import React from "react";

import "./frontend/UI/navstyle.css";

import Navbar from "./navbar";
import MainContentArea from "./mainContentArea";
import { BrowserRouter as Router } from "react-router-dom";

const App = (props) => {
  return (
    <>
      <Router>
        <Navbar />
        <MainContentArea />
      </Router>
    </>
  );
};

export default App;

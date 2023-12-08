import React from "react";

import "./frontend/UI/navstyle.css";

import Navbar from "./frontend/components/navbar";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { selectAuth } from "./frontend/Redux_Store/authSlice";
import Login from "./frontend/components/login/login";
import { useSelector } from "react-redux";
import mainContentArea from "./frontend/components/MCA";

const App = (props) => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Navbar />, children: mainContentArea },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

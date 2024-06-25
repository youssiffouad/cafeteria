import React from "react";

import "./UI/navstyle.css";

import Navbar from "./components/navbar";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./components/login/login";

import mainContentArea from "./components/MCA";

const App = (props) => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Navbar />, children: mainContentArea },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

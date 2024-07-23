import React from "react";

import "./UI/navstyle.css";

import Navbar from "./components/navbar";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { serverSocket } from "./backendSocket";

import Login from "./components/login/login";

import mainContentArea from "./components/MCA";
import useSSE from "./Hooks/SSEHooks";
import { addRecentNotification } from "./Redux_Store/NotificationSlice";
import { useDispatch, useSelector } from "react-redux";

const App = (props) => {
  const id = useSelector((state) => state.auth?.user?.user_id);
  const dispatch = useDispatch();
  const eventSourceUrl = `${serverSocket}/notifications/stream?clientId=${id}`;
  const handleNewMessage = (newMessage) => {
    console.log("i called handle message");
    dispatch(addRecentNotification(newMessage));
  };
  useSSE(eventSourceUrl, handleNewMessage);
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Navbar />, children: mainContentArea },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

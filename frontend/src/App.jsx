import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { BASE_URL } from "../BaseUrl.js";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <SignUp /> },
  { path: "/login", element: <Login /> },
]);
const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${ BASE_URL}/`, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketio));
      
      socketio?.on('getOnlineUsers', (onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }

  }, [authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

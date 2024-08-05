import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../BaseUrl";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch();
  const navigate = useNavigate();


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if ((!username, !password)) {
      return toast.error("All fields are required", {
        duration: 2000,
      });
    }

    const userData = {
      username,
      password,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      

      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          duration: 2000,
        });

          
      dispath(setAuthUser(res?.data))
      navigate("/");
      }
    

    } catch (error) {
      toast.error(error.response.data.message);
    }

    ClearField();
  };

  // For clear all Input field
  const ClearField = () => {
    setUserName("");
    setPassword("");
  };

  return (
    <div className="min-w-96 mx-auto ">
      <div className="h-full w-full  bg-gray-400 rounded-md p-6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center ">Login</h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full input input-bordered h-10  bg-white"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  label-text text-black">Password</span>
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full input input-bordered h-10  bg-white"
              type="password"
              placeholder="Password"
            />
          </div>

          <Link to={"/register"}>Don`t` have an account?</Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-7 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

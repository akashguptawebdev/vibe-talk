import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../BaseUrl";


const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  
  const navigate = useNavigate();
  const userData = {
    fullname,
    username,
    password,
    confirmPassword,
    gender,
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(!fullname || !username || !password || !confirmPassword ||!gender ){
    return  toast.error("Please Enter All field")
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );


      if(res?.data?.success){
        toast.success(res?.data?.message , {
          duration: 2000,
        })
        navigate('/login')
      }


    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

    ClearField();
  };

  const ClearField = () => {
    setFullName("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setGender("");
  };
  return (
    <div className="min-w-96 mx-auto ">
      <div className="h-full w-full  bg-gray-400 rounded-md p-6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center ">SignUp</h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Full Name</span>
            </label>
            <input
              value={fullname}
              className="w-full input input-bordered h-10 bg-white"
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">User Name</span>
            </label>
            <input
              value={username}
              className="w-full input input-bordered h-10 bg-white"
              type="text"
              placeholder="Enter UserName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
              value={password}
              className="w-full input input-bordered h-10 bg-white"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">
                Confirm Password
              </span>
            </label>
            <input
              value={confirmPassword}
              className="w-full input input-bordered h-10 bg-white"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center my-4">
            <div className="flex checkbox-group">
              <label htmlFor="male" className="cursor-pointer">
                Male
              </label>
              <input
                value={gender}
                type="radio"
                id="male"
                name="gender"
                checked={gender === "male"}
                className="checkbox mx-2 "
                onChange={(e) => {
                  setGender("male");
                }}
              />

              <label htmlFor="female" className="cursor-pointer">
                Female
              </label>
              <input
                value={gender}
                type="radio"
                id="female"
                name="gender"
                checked={gender === "female"}
                className="checkbox mx-2 "
                onChange={(e) => {
                  setGender("female");
                }}
              />
            </div>
          </div>
          <Link to={"/login"}>Already have an account?</Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-7 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

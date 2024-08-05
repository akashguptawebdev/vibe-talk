import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentOtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BaseUrl";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);

  const Dispatch = useDispatch();
  const HandleLogout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);

      toast.success(res?.data.message);
      Dispatch(setAuthUser(null))
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
   
    const conversationUser = otherUsers?.find((user) =>
      user?.fullname.toLowerCase().includes(search.toLowerCase())
    );
    console.log(conversationUser);
    if (conversationUser) {
      Dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col ">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-lg bg-white "
          placeholder="Search..."
        />

        <button type="submit" className="btn bg-indigo-500 text-white">
          <FaSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <ComponentOtherUsers />
      <div className="mt-2 ">
        <button onClick={HandleLogout} className="btn btn-sm text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

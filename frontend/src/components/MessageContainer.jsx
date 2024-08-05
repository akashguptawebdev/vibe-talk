import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from '../redux/userSlice'
const MessageContainer = () => {
  const { selectedUser , authUser ,onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers ? onlineUsers?.includes(selectedUser?._id) : false;
  return (
    <>
      {selectedUser !==null ? (
        <div className="md:min-w-[550px] flex flex-col">
          <div className="flex gap-2 items-center p-2 bg-zinc-800 text-white px-4 py-2 mb-2 shadow-md rounded-sm shadow-gray-600 ">
            <div className={`avatar ${isOnline? 'online':""}`}>
              <div className="w-8 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user Profile" />
              </div>
            </div>

            <div className=" flex flex-col flex-1">
              <div className="flex justify-between  gap-2 ">
                <p>{selectedUser?.fullname}</p>
              </div>
            </div>
          </div>
          <Messages />

          <SendInput />
        </div>
      ) : (
        <div className="md:min-[550px] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-extrabold text-zinc-300">Hi, {authUser?.fullname}</h1>
          <h1 className="text-2xl font-extrabold text-zinc-300">Let`s Start Conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;

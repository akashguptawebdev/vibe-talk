import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const {authUser , selectedUser} = useSelector(store=>store.user);

  useEffect(()=>{
      scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
   
  return (
    <div>
    {message?.map((messages, index) => (
        <div
        key={index}
        ref={scroll }
        className={`chat ${authUser?._id == messages.senderId ? 'chat-end' : 'chat-start'}`}
        >
        
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={messages.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white ">12:45</time>
        </div>
        <div className={`chat-bubble mb-2 text-white ${message?.senderId !== authUser?._id ? 'bg-black text-white' : 'bg-black text-white'}`}>
        {messages.message}
        </div>
      </div>
    ))}
  </div>
  )
};

export default SingleMessage;

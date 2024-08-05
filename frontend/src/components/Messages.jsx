import React from "react";
import SingleMessage from "./SingleMessage";
import useGetMessages from "../hook/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hook/useGetRealTimeMes";
const Messages = () => {
  useGetRealTimeMessage();
  useGetMessages();
  const {message} = useSelector(store => store.message)
  
  return (
    <div className="px-4 flex-1 overflow-auto">
      <SingleMessage  message={message}/>
    </div>
  );
};

export default Messages;

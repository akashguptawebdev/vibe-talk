import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "../../BaseUrl";
const SendInput = () => {
 
  const  {message} = useSelector(store => store.message)
  const [inputMessage, setInputMessage] = useState("");
  const {selectedUser} = useSelector(store => store.user)
  const Dispatch = useDispatch();
  const onSubmitHandler = async(e)=>{
 
      e.preventDefault()

      try {
        const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {
          message:inputMessage
        },{withCredentials:true})
        
     
        Dispatch(setMessages([...message , res?.data?.newMessage]))

        setInputMessage("")
        
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <div>
      <form action="" onSubmit={onSubmitHandler} className="px-4 my-3 sm:w-[77%]  ">
        <div className="w-full relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message"
            className="border border-zinc-500 text-sm rounded block w-full bg-gray-600 p-3 text-white"
          />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pr-2">
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;

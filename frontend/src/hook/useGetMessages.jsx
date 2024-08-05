import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setMessages} from "../redux/messageSlice"
import { BASE_URL } from "../../BaseUrl.js";
const useGetMessages = async () => {
  const { selectedUser } = useSelector(store=> store.user);

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchMessage = async () => {
        
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );


        dispatch(setMessages(res?.data))
  
      } catch (error) {
        console.log(error); 
      }
    };

    fetchMessage();
  }, [selectedUser]);
};

export default useGetMessages;

import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {message} = useSelector(store => store.message)
    console.log(message)
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{

            console.log(newMessage)
            dispatch(setMessages([...message, newMessage]));
        });
        return () => socket?.off("newMessage");
    },[socket ,setMessages, message]);
};
export default useGetRealTimeMessage;
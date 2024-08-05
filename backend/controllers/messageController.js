import messageSlice from "../../frontend/src/redux/messageSlice.js";
import {Conversation} from "../models/conversationModel.js"
import {Message} from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../Socket/socket.js";
export const sendMessage = async (req, res) =>{
    try {

        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({
            particioants:{$all:[senderId , receiverId]},
        }); 

        if( receiverId=='undefined' || !senderId == 'undefined'){
            return;
        }

        if(!gotConversation){
            gotConversation = await Conversation.create({
                particioants:[senderId,receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,receiverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
   
        await Promise.all([gotConversation.save() , newMessage.save()])

        res.status(201).json({
            newMessage
        })
        // SOCKET IO

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

    } catch (error) {
        console.log(error)
    }
}

export const getMessage = async (req, res)=>{
    try {
       const receiverId = req.params.id;
       const senderId = req.id;
       if(!receiverId || !senderId){
            return res.status(400).json({
                message:"User not Found",
                success:false
            })
       }
       if( receiverId=='undefined' || !senderId == 'undefined'){
        return;
    }
       const conversation = await Conversation.findOne({
            particioants:{$all : [senderId , receiverId]}
       }).populate("messages")

       if(!conversation){
        return res.status(400).json({
            message:"There is no Message Yet",
            success:false
        })
       }

       return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error)
    }
}
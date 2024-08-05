import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/database.js";
import userRoutes from './routes/userRoute.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import {app ,server} from './Socket/socket.js'
import cors from "cors";
dotenv.config({})

// const app = express();
const PORT = process.env.PORT ||  6655;


// MiddleWares
const corsOption = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/message",messageRoute)
// http://localhost:6655/api/v1/user/


 











// server Listen
server.listen(PORT , ()=>{
    console.log(`server listen at port ${PORT}`)
    connectDB()
})


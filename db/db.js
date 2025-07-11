import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const ConnectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB ")
    } catch (error) {
        console.log("Not able to Connect DB ")
    }
}
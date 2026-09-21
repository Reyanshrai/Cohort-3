import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()

export const connectDb = async ()=>{
   await mongoose.connect(process.env.mongodb_uri).then(()=>{
        console.log("Db is connected");
        
    })
} 
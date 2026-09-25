import mongoose from "mongoose"
import config from "./config.js"

const connectDB = async()=>{
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("Db is connected");
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB
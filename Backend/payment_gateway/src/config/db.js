import mongoose from "mongoose";
import config from "./config.js";

const connectedToDb = async() =>{

    await mongoose.connect(config.MONGO_URI)
    console.log("Db got connected");
    
}

export default connectedToDb
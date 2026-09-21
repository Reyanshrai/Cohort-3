import app from "./src/app.js"
import { connectDb } from "./src/config/db.js";


await connectDb()

const Port = 3000

app.listen(Port,()=>{
    console.log(`server is running on ${Port} Port`);
    
})
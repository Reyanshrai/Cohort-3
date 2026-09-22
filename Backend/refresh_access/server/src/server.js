import app from "./app/app.js"
import connectDB from "./config/db.js";
await connectDB()

const Port = 3000

app.listen(Port,()=>{
    console.log(`server is going on ${Port} port`);
    
})
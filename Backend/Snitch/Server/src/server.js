import app from "./app/app.js"
import connectDB from "./config/db.js"

await connectDB()

const port = 3000

app.listen(port,()=>{
    console.log(`server is gonna on ${port} Port`)
})
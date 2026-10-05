import app from "./app/app.js"
import config from "./config/config.js"
import connectToDb from './config/db.js'

await connectToDb()



app.listen(config.port,()=>{
    console.log(`Server is gonna ${config.port} port`);
    
})
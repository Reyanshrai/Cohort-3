const express = require("express")

const app = express()
const port = 3000

app.get('/',(req,res) =>{
    res.send("Server is going on")
})

app.listen(port,()=>{
    console.log("Going on")
})
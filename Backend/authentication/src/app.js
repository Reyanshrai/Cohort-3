import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import userModel from "./models/user.model.js";
import {authenticate} from './middlware/auth.middleware.js'

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome on Server",
  });
});

app.post("/api/register", async (req, res) => {
  const { email, name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10)


  const user = await userModel.create({
    email,
    name,
    password : hashedPassword
  })

  const token = jwt.sign({
    id : user._id,

  },"rey9009");

  res.status(201).json({
    message : "User created successfully",
    data : {
        user:{
            email,
            name,
            id: user._id
        },
        token
    }
  })


});

app.get("/api/auth/me",authenticate,(req,res) => {
  console.log(req.user)

  res.status(200).json({
    success : true,
    data : {
      user : req.user
    }
  })
})

app.post("/api/auth/login",async (req,res) =>{
  const {email,password} = req.body

  if(!email || !password){
    res.status(400).json({
      message : "Fields are invalid"
    })
  }

  const user = await userModel.findOne({
    email
  })

  const isValidPassword = await bcrypt.compare(password, user.password)


  if(!isValidPassword){
    res.status(400).json({
      message : "Invalid email and password"
    })
  }

  const token = jwt.sign(
    {id : user._id}
  ,"rey9009")

  res.status(200).json({
    success : true,
    message : "User login Successfully",
    data : {
      user: {
        email : user.email,
        name : user.name
      }
    },
    token
  
  })
})

export default app;

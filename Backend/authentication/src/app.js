import express from "express";
import jwt from "jsonwebtoken";
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

  const user = await userModel.create({
    email,name,password
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

export default app;

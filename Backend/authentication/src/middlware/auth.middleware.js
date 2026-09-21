import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const authenticate = async (req,res,next) =>{

    const token = req.headers.authorization

    const data = jwt.decode(token)

    const user = await userModel.findById(data.id)

    req.user = user

    next()
}
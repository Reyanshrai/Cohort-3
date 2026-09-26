import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {createAccessToken,createRefreshToken} from "../utils/auth.utils.js"

/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
 */

export const register = async (req,res) => {
    const {email,name,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "User already exist with this email address ",
            errors : [
                {
                    path : "email",
                    message : 'User already exists with this email'
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash : await bcrypt.hash(password , 12)
    })

    const accessToken = createAccessToken({
        userId : user._id,
        role : user.role
    })

    const refreshToken = createRefreshToken({
        userId : user._id,
        role : user.role
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly : true
    })

    await userModel.findByIdAndUpdate(user._id,{
        refreshToken
    })

    res.status(201).json({
        message : "User register successfully",
        data : {
            user : {
                email : user.email,
                name : user.name,
                id : user._id
            },
            accessToken
        }
        
    })
}

/**
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.password String
 * res.status(200)
 */

    
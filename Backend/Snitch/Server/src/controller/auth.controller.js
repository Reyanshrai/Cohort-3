import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {createAccessToken,createRefreshToken,readRefreshToken} from "../utils/auth.utils.js"


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
 * @description login a user and create new set of access token and refrsesh token
 * @param req.body.email String
 * @param req.body.password String
 * res.status(200)
 */

export const login = async (req,res) =>{
    const {email,password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message : "Invaild email or password",

        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.passwordHash)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const accessToken = createAccessToken({
        userId : user._id,
        role : user.role
    })

    const refreshToken = createRefreshToken({
        userId : user._id,
        role : user.role
    })

    await userModel.findOneAndUpdate({
        email
    },
        {
            refreshToken
    })

    res.cookie("refreshToken" , refreshToken,{
        httpOnly : true
    })

    res.status(200).json({
        message : "user loggesIn successfully",
        data : {
            user : {
                id : user._id,
                email : user.email,
                name : user.name
            },
            accessToken
        }
    })
}

export const refresh = async (req,res) =>{

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message : "refresh Token is required"
        })
    }

    try {
        
        const decoded = readRefreshToken(refreshToken)

        const {userId,role} = decoded

        const user = await userModel.findById(userId)

        if(refreshToken !== user.refreshToken){
            await userModel.findByIdAndUpdate(user._id,{
                refreshToken : null,
            })

            return res.status(401).json({
                message : "Refresh token mismatch"
            })
        }

        const accessToken = createAccessToken({
            userId,role
        })

        const newRefreshToken = createRefreshToken({
            userId,role
        })

        await userModel.findByIdAndUpdate(user._id,{
            refreshToken : newRefreshToken
        })

        res.cookie("refreshToken",newRefreshToken,{
            httpOnly : true
        })

        res.status(200).json({
            message : "Token rotated successfully",
            data : {
                user : {
                    email : user.email,
                    name : user.name,
                    id : user._id
                },
                accessToken
            }
        })

    } catch (error) {
        return res.status(401).json({
            message : "invalid refresh Token"
        })
    }
}

export const getMe = async (req,res) =>{

    const {userId,role} = req.user

    const user = await userModel.findById(userId)

    res.status(200).json({
        message : "User fetched successfully",
        data : {
            user : {
                name : user.name,
                email : user.email,
                id : user._id
            }
        }
    })

}
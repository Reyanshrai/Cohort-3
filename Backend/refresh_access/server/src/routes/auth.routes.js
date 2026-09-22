import express from "express";
import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import {generateTokens,verifyAccessToken,verifyRefreshToken} from "../utils/auth.js"


const router = express.Router()



router.post("/register",async (req,res) => {
    const {name,email,password} = req.body

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
        return res.status(400).json({
            message : "User already Exists",
            errors:[
                {
                    filed : "email",
                    message : "User already exists"
                }
            ]
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordHash : await bcrypt.hash(password,10)
    })

    const {accessToken,refreshToken} = generateTokens({userId : user._id})

    user.refreshToken = refreshToken
    await user.save()

    res.cookie("refreshToken",refreshToken,{
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "user Registerd successfully",
        data : {
            user : {
                name : user.name,
                email : user.email
            }
        },
        accessToken
    })
})

router.get("/me",async (req,res)=>{
    const accessToken = req.headers.authorization?.split(' ')[1] 

    try {
        const decoded = verifyAccessToken(accessToken)

        const user = await userModel.findById(decoded.id)

        res.status(200).json({
            message : "User fetched successfully",
            data:{
                user : {
                    name : user.name,
                    email : user.email
                }
            }
        })
    } catch (error) {
       return res.status(401).json({
        message : "Unauthorized , invalid or expired access token"
       })
    }

})

router.post("/refresh",async (req,res) =>{
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message : "Unauthorized, refresh token not found"
        })
    }

    try {
        const decoded =  verifyRefreshToken(refreshToken)

        const user = await userModel.findById(decoded.id)

        if(refreshToken !== user.refreshToken){
           
            user.refreshToken = null
            await user.save()

            return res.status(401).json({
                message : "Unauthorized , refresh token mismatch"
            })
        }

        const {accessToken , refreshToken : newRefreshToken} = generateTokens({userId : user._id})

        res.cookie("refreshToken",newRefreshToken,{httpOnly : true})

        user.refreshToken = newRefreshToken
        await user.save()

        res.status(200).json({
            message : "Toeken refreshed Successfully",
            accessToken
        })
        
    } catch (error) {
        return res.status(401).json({
            message : "unauthorized , Invalid or expired refresh token"
        })
    }


})

export default router
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {createAccessToken,} from '../utils/auth.utils.js'



/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
*/

export const register = async (req,res)=>{

    const {name ,email , password,confirmPassword} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "User already Exists",
            errors : [
                {
                    path : "email",
                    message : 'User already exists with this email'
                }
            ]
        })
    }

    const user = await userModel.create({
        name,
        email,
        password : await bcrypt.hash(password,10)
    })

    const accessToken = createAccessToken({
        userId : user._id,
    })


    res.status(201).json({
        message : "User Created Successfully",
        data : {
            user : {
                id : user._id,
                name : user.name,
                email : user.email
            },
        }
    })
}

/**
 * @description login an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.password String
*/


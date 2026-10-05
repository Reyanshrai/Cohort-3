import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const createAccessToken = ({userId}) => {

    const accessToken = jwt.sign({
        userId 
    },config.ACCESS_TOKEN_SECRET,{expiresIn : '15Min'})

    return accessToken
}

export const CreateRefreshToken = ({userId}) => {

    const refreshToken = jwt.sign({
        userId
    },config.REFRESH_TOKEN_SECRET,{expiresIn : '7D'})

    return refreshToken
}
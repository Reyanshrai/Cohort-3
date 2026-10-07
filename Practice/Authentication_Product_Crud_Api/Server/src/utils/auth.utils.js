import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import createTokenHash from './tokenHash.utils.js'
import refreshModel from '../models/refreshSession.model.js'

export const createAccessToken = ({userId}) => {

    const accessToken = jwt.sign({
        userId 
    },config.ACCESS_TOKEN_SECRET,{expiresIn : '15Min'})

    return accessToken
}

export const createRefreshToken = ({userId}) => {

    const refreshToken = jwt.sign({
        userId
    },config.REFRESH_TOKEN_SECRET,{expiresIn : '7D'})

    return refreshToken
}

export const verifyRefreshToken = async (refrehToken) => {


    const decoded = jwt.verify(refrehToken,config.REFRESH_TOKEN_SECRET)

    const tokenHash = createTokenHash(refrehToken)

    const session = await refreshModel.findOne({
        tokenHash
    })

    if(!session){
        throw new Error("Invalid refresh token") 
    }

    if(session.revokedAt !== null){
        throw new Error("Invalid or expired refresh token")
    }

    if(session.expiresAt <= Date.now()){
        throw new Error("Invalid or expired refresh token")
    }

    return decoded.userId

}
import {readAccessToken} from "../utils/auth.utils.js"

export const authenticate = (req,res,next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
         return res.status(401).json({
        message: "Authorization header missing or invalid"
  })
    }

    const accessToken = authHeader.split(' ')[1]

    if(!accessToken){
        return res.status(401).josn({
            message : "Access token not found in the request header"
        })
    }

    try {

        const decoded = readAccessToken(accessToken)

        req.user = decoded

        next()

    } catch (error) {
        res.status(401).json({
            message : "Invalid or expire access token"
        })
    }
}
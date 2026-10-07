import {Router} from 'express'
import {registerValidator,loginValidator} from "../validator/auth.validator.js"
import {register,login,refreshToken} from "../controller/auth.controller.js"

const router = Router()

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = {email,name,password,confirmPassword}
 * @response res.status = 201 (if successfull) 
*/

router.post('/register',registerValidator,register)

/**
 * @POST /api/auth/login
 * @param req Express req
 * @param req.body = {email,password,}
 * @response res.status = 200 (if successfull) 
*/

router.post('/login',loginValidator,login)

/**
 * @POST /api/auth/refresh-token
 * @param req Express req
 * @response res.status = 200 (if successfull) 
*/

router.post("/refresh-token",refreshToken)

export default router
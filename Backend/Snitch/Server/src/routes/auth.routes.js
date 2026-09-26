import {Router} from "express"
import {registerValidator,loginValidator} from "../validators/auth.validator.js"
import {register} from "../controller/auth.controller.js"

const router = Router()

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = {email,name,password} 
 * @response res.status = 201 (if successfull)
 */

router.post('/register',registerValidator,register)

/**
 * @POST /api/auth/login
 * @param req Express req
 * @param req.body = {email,password} 
 * @response res.status = 200 (if successfull)
 */

router.post('/login',loginValidator)

export default router
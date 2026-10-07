import {body,validationResult} from 'express-validator'

export const registerValidator = [
    body('name')
        .exists().withMessage("Name must be required").bail()
        .isString().withMessage('Name must be string').bail()
        .trim()
        .isLength({min : 2 , max : 50}).withMessage("Name length you can keep between 2 to 50"),

    body('email')
        .exists().withMessage("Email is required").bail()   
        .trim()
        .isEmail().withMessage('Enter valid email').bail(),

    body('password')
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a String')
        .isLength({min : 6}).withMessage("Password at least 6 character long"), 

    body('confirmPassword')
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a String')
        .isLength({min : 6}).withMessage("Password at least 6 character long")
        .custom((value , {req})=>{
            return value === req.body.password
        }).withMessage('Passwords do not match'),

    (req,res,next) =>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : 'Invalid Request',
                errors : errors.array()
            })
        }

        next()
    }    

]

export const loginValidator = [

    body('email')
        .exists().withMessage("Email is required").bail()   
        .trim()
        .isEmail().withMessage('Enter valid email').bail(),

    body("password")
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a String')
        .isLength({min : 6}).withMessage("Password at least 6 character long"), 

]
import {body,validationResult} from "express-validator"

export const registerValidator = [
    body('email')
        .exists().withMessage('Email is required').bail()
        .trim()
        .isEmail().withMessage('Enter valid email address'),

    body("name")
        .exists().withMessage('Name is required').bail()
        .isString().withMessage('Name must be a String')
        .trim()
        .isLength({min : 2 , max : 50}).withMessage("Name length must be 2 to 50 character"),

    body('password')
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a String')
        .trim()
        .isLength({min : 6}).withMessage("Password at least 6 character long"),  
    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Invalid requests",
                errors : errors.array()
            })
        }

        next()
    }      
]

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a String Value").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address "),
    
    body("password")   
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be string").bail()
        .trim()
        .isLength({min : 6}).withMessage("Password atleast 6 character long"),

    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Invalid Data",
                errors : errors.array()
            })
        }

        next()


    }    
]

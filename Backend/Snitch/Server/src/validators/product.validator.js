import {body,validationResult} from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be string").bail()
        .trim()
        .isLength({min : 2 , max : 50}).withMessage("Title length must be between 2 to 50 character").bail()
        .isAlpha("en-US",{ignore : " -"}).withMessage("Title can only have english small case and capital case character"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be string").bail()
        .trim()
        .isLength({min : 20, max : 500}).withMessage("Description length must be between 20 to 50"),

    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat({min : 0}).withMessage("price amount must be a floating number and must be greater than 0 ").bail(),
    
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be required")
        .isIn(["INR","USD"]).withMessage("Currency either be INR or USD"),

    body("sizes")
        .exists().withMessage("Size is required").bail()
        .isArray().withMessage("Sizes must be an array of object"),
    
    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry sizes of array").bail()
        .isString().withMessage("Size must be string value").bail()
        .trim()
        .isIn(['XS,','S','M','L','XL','XXL']).withMessage('size can be one of theses XS,S,M,L,XL,XXL'),

    body("sizes.*.stock")
        .exists().withMessage("Size must be present in every entry sizes of array").bail()
        .isInt({min : 0}).withMessage("Stock must be integer value").bail(),

    (req,res,next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "invalid request",
                errors : errors.array()
            })
        }

        next()
    }
]
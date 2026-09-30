import {body,validationResult} from "express-validator"

export const addToCartVaildator = [
    body("productId")
        .exists().withMessage("Product is required").bail()
        .isString().withMessage("Product id must be String").bail()
        .isMongoId().withMessage("ProductId must be vaild mongodb ID "),

    body("quantity")    
        .exists().withMessage().bail()
        .isInt({min : 1}).withMessage("Quantity must be integer and greater than 0"),

    body("size")
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be a String").bail()
        .isIn(['XS','S','M','L','XL','XXL']).withMessage("Size must be one of XL,S,M,L,XL,XXL"),
        
    (req,res,next)=> {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Validation failed",
                errors : errors.array()
            })
        }

        next()
    } 
]
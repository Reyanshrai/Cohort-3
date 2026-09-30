import {Router} from "express"
import {createProductValidator} from "../validators/product.validator.js"
import {authenticate} from '../middlewares/auth.middleware.js'
import {createProduct} from "../controller/product.controller.js"
import upload from "../config/multer.config.js"


const router = Router()

/**
 * @method POST
 * @route /api/products
 * @description creates product and save it data  into db images wil be store in imagekit
 * @access seller
 * req.body => {title , description , price:{amount , currency},sizes,:size , stock}
 */

router.post('/',authenticate,
    
    // check role is seller or not
    (req,res,next)=>{
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message : "User is not authorized to create product"
        })
    }
    next()

    // required for reading data from req.body  if the formate is form-data(multipart form data )
},upload.array("images"),

    // parse the complex data like object and array into json

    (req,res,next)=>{

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()
},createProductValidator,createProduct)

export default router
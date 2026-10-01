import {Router} from "express"
import {createProductValidator,unlistProductValidator,listProductValidator} from "../validators/product.validator.js"
import {authenticate,authenticateSeller} from '../middlewares/auth.middleware.js'
import {createProduct,listAllProducts,unlistProduct,listProduct,listAllProductsToSeller} from "../controller/product.controller.js"
import upload from "../config/multer.config.js"


const router = Router()

/**
 * @method POST
 * @route /api/products
 * @description creates product and save it data  into db images wil be store in imagekit
 * @access seller
 * req.body => {title , description , price:{amount , currency},sizes,:size , stock}
*/

router.post('/',authenticate,authenticateSeller,upload.array("images"),

    // parse the complex data like object and array into json

    (req,res,next)=>{

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()
},createProductValidator,createProduct)

/**
 * @method GET
 * @route /api/product
 * @description Read all the published products from the DB
 * @access Only authenticate user
*/

router.get('/',authenticate,listAllProducts)

/**
 * @method GET
 * @route /api/product/seller 
 * @description read all the products from the db
 * @access seller
*/

router.get('/seller',authenticate,authenticateSeller,listAllProductsToSeller)

/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description unlist a product by its id
 * @access seller
*/

router.patch('/unlist/:id',authenticate,authenticateSeller,unlistProductValidator,unlistProduct)

/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description unlist a product by its id
 * @access seller
*/

router.patch('/unlist/:id',authenticate,authenticateSeller,listProductValidator,listProduct)

export default router
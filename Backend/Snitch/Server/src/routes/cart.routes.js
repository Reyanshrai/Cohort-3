import {Router} from 'express' 
import {addToCartVaildator} from "../validators/cart.validator.js"  
import {authenticate} from "../middlewares/auth.middleware.js"  
import {addToCart,getCart} from "../controller/cart.controller.js" 

const router = Router()

/**
 * @method POST
 * @route /api/cart
 * @access protectd
 * @description Add an product to users cart
*/

router.post('/',authenticate,addToCartVaildator,addToCart)

/**
 * @method GET
 * @route /api/cart
 * @access protectd
 * @description Get the user cart
*/

router.get('/',authenticate,getCart)

export default router
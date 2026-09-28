import {Router} from "express"
import {createProductValidator} from "../validators/product.validator.js"

const router = Router()

/**
 * @method POST
 * @route /api/products
 * @description creates product and save it data  into db images wil be store in imagekit
 * @access seller
 * req.body => {title , description , price:{amount , currency},sizes,:size , stock}
 */

router.post('')

export default router
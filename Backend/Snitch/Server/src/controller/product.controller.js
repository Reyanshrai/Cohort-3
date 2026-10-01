import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req,res)=>{

    const {title,description} = req.body

    const responses = await Promise.all(
        req.files.map((file)=>
        uploadFile({
            buffer : file.buffer,
            fileName : file.originalname
        }))
    )

    const filesUrl = responses.map((response) => response.url)

    console.log("filesUrl",filesUrl);
    

    const product = await productModel.create({
        title,
        description,
        price : {
            amount : req.body.price.amount,
            currency : req.body.price.currency
        },
        sizes : req.body.sizes,
        images : filesUrl,
        seller : req.user.userId
    })
    



    res.status(201).json({
        message : "product created successfully",
        data : {
            product
        }
    })
    
}

export const listAllProducts = async(req,res) =>{

    const product = await productModel.find({ published : true })

    res.status(200).json({
        message : "Product fetched successfully",
        data : {
            product
        }
    })

}

export const listAllProductsToSeller = async (req,res) => {

    const product = await productModel.find()

    return res.status(200).json({
        message : "All products fetched successfully",
        data : {
            product
        }

    })
}

export const unlistProduct = async (req,res)=>{

    const {id} = req.params

    const product = await productModel.findById(id)

    if(!product){
        return res.status(400).json({
            message : "Product not found by id",
        })
    }

    // make product unpublished

    await productModel.findByIdAndUpdate(id,
        {
            published : false
        }
    )

    return res.status(200).json({
        message : "Product unpublished successfully"
    })
}

export const listProduct = async (req,res)=>{

    const {id} = req.params

    const product = await productModel.findById(id)

    if(!product){
        return res.status(400).json({
            message : "Product not found by id",
        })
    }

    // make product published

    await productModel.findByIdAndUpdate(id,
        {
            published : true
        }
    )

    return res.status(200).json({
        message : "Product published successfully"
    })
}
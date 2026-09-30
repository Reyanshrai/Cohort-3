import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req,res)=>{

    const {title,description,sizes,price,} = req.body

    const filesUrl = []

    for(let i = 0; i<req.files.length ; i++){

        const response = await uploadFile({
            buffer : req.files[i].buffer,
            fileName : req.files[i].originalname
        })

        filesUrl.push(response.url)
    }

    console.log("FilesUrl",filesUrl);

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

    const product = await productModel.find()

    res.status(200).json({
        message : "Product fetched successfully",
        data : {
            product
        }
    })

}
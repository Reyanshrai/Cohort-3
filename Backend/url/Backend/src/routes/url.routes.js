import express from "express"
import generateCode from "../utils/generateCode.js"
import urlModel from '../models/url.model.js'


const router = express.Router()

router.post('/',async (req,res)=>{

    const {url} = req.body

    if(!url){
        return res.status(400).json({error : "URL is required"})
    }

    if(url.startsWith("http://" == false && url.startsWith('https:') == false)){
        return res.status(400).json({error : "Please enter a valid url staring with http:// or https://"})
    }

    if(url.length > 2048 ){
        return res.status(400).json({error : "Url is too long"})
    }

    const code = generateCode()

    const newUrl = await urlModel.create({
        originalUrl : url,
        shortCode : code
    })

    res.status(201).json({
        message : "URL Shortend successfully",
        data : {
            originalUrl : newUrl.originalUrl,
            shortCode : newUrl.shortCode
        }
    })
})

router.get("/",async(req,res)=>{

    const urls = await urlModel.find()     

    res.status(200).json({
        message : "URL fetched successfully",
        data : {
            urls
        }
    })
})

router.delete("/:id",async (req,res)=>{

    const {id} = req.params

    const url = await urlModel.findById(id)

    if(!url){
        return res.status(400).json({message : "URL not found"})
    }

    await urlModel.findByIdAndDelete(id)

    return res.status(200).json({
        message : "URL deleted successfully"
    })

})

export default router
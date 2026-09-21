import postModel from "../models/post.model.js";
import { sendFiles } from "../services/storage.service.js";

export const createPost = async (req, res) => {
  const { caption } = req.body;
  const file = req.file;

  try {
  
    if (!caption || !file) {
      return res.status(400).json({
        success: false,
        message: "Inputs are required",
      });
    }

    const uploadImage = await sendFiles(
      file.buffer,
      file.originalname
    );

    const post = await postModel.create({
      caption,
      image: uploadImage.url,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPost = async (req,res) =>{
  const posts = await postModel.find()

  return res.status(200).json({
    success : true,
    message : "Posts fetched successfuly",
    posts
  })
}
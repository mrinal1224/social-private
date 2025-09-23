import uploadOnCloud from "../config/cloudinary";
import Post from '../models/post.model.js'



export const uploadPost = async(req , res)=>{
 try {
    const {caption , mediaType} = req.body

    let media; 
    if(req.file){
        media = await uploadOnCloud(req.file)
    }else{
        return res.status(400).json({message:'Media required'})
    }

    const post = Post.create({
        caption , media ,  mediaType , author:req.userId
    })

    const populatedPost = await Post.findById(post._id).populate("author" , 'name username profileImage')

    return res.status(201).json(populatedPost)
 } catch (error) {
    return res.status(500).json({message:`upload Error ${error}`})
 }
}


export const getAllPosts = async ()=>{
    
}


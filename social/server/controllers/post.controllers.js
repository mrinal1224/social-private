import uploadOnCloud from "../config/cloudinary.js";
import Post from '../models/post.model.js'
import User from '../models/user.model.js'

export const uploadPost = async(req, res) => {
  try {
    const {caption, mediaType} = req.body

    let media; 
    if(req.file) {
      media = await uploadOnCloud(req.file.path)
    } else {
      return res.status(400).json({message:'Media File required'})
    }

    const post = await Post.create({
      caption, media, mediaType, author:req.userId
    })

    const user = await User.findById(req.userId).populate('posts')
    user.posts.push(post._id)
    await user.save()

    const populatedPost = await Post.findById(post._id).populate("author", 'name userName profileImage')
   
    return res.status(201).json(populatedPost)
  } catch (error) {
    return res.status(500).json({message:`upload Error ${error}`})
  }
}

/**
 * Get posts from followed users + own posts
 * @route GET /api/post/getAll
 */
export const getAllPosts = async (req, res) => {
  try {
    // Get current user with following list
    const currentUser = await User.findById(req.userId);
    
    // Create array of user IDs to fetch posts from (followed users + self)
    const userIds = [req.userId, ...currentUser.following];
    
    // Get posts only from these users
    const posts = await Post.find({
      author: { $in: userIds }
    })
      .populate("author", "name userName profileImage")
      .populate("comments.author", "name userName profileImage")
      .sort({ createdAt: -1 }); // Latest posts first
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `Cannot get posts error ${error}` });
  }
};

/**
 * Get all posts for explore page (optional - shows all posts)
 * @route GET /api/post/explore
 */
export const getExplorePosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author", "name userName profileImage")
      .sort({ createdAt: -1 })
      .limit(50); // Limit for performance
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `Cannot get explore posts error ${error}` });
  }
};

export const like = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    
    if (!post) {
      return res.status(400).json({ message: "post not found" })
    }

    const alreadyLiked = post.likes.some(id => id.toString() === req.userId.toString())

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.userId.toString())
    } else {
      // Like
      post.likes.push(req.userId)
    }

    await post.save()
    await post.populate("author", "name userName profileImage")
    await post.populate("comments.author", "name userName profileImage")
    
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `like post error ${error}` })
  }
}

export const comment = async (req, res) => {
  try {
    const { message } = req.body
    const postId = req.params.postId
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ message: "Comment cannot be empty" })
    }

    const post = await Post.findById(postId)
    
    if (!post) {
      return res.status(400).json({ message: "post not found" })
    }

    post.comments.push({
      author: req.userId,
      message
    })

    await post.save()
    await post.populate("author", "name userName profileImage")
    await post.populate("comments.author", "name userName profileImage")
    
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `comment post error ${error}` })
  }
}
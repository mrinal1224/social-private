import uploadOnCloud from "../config/cloudinary.js";
import Story from '../models/story.model.js'
import User from '../models/user.model.js'

// Upload Story
export const uploadStory = async(req, res) => {
  try {
    const { caption, mediaType } = req.body

    if (!mediaType) {
      return res.status(400).json({ message: 'Media type is required' })
    }

    let mediaUrl; 
    if (req.file) {
      mediaUrl = await uploadOnCloud(req.file.path)
    } else {
      return res.status(400).json({ message: 'Media file required' })
    }

    const story = await Story.create({
      caption, 
      mediaUrl, 
      mediaType, 
      author: req.userId
    })

    const user = await User.findById(req.userId)
    user.stories.push(story._id)
    await user.save()

    const populatedStory = await Story.findById(story._id)
      .populate("author", 'name userName profileImage')
   
    return res.status(201).json(populatedStory)
  } catch (error) {
    return res.status(500).json({ message: `Upload story error: ${error}` })
  }
}

// Get All Stories (from people you follow + your own)
export const getAllStories = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).populate('following')
    
    // Get IDs of people you follow + yourself
    const userIds = [req.userId, ...currentUser.following.map(user => user._id)]
    
    // Get all active stories from these users
    const stories = await Story.find({
      author: { $in: userIds }
    })
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage")
      .sort({ createdAt: -1 })
    
    // Group stories by author
    const groupedStories = stories.reduce((acc, story) => {
      const authorId = story.author._id.toString()
      if (!acc[authorId]) {
        acc[authorId] = {
          user: story.author,
          stories: []
        }
      }
      acc[authorId].stories.push(story)
      return acc
    }, {})

    return res.status(200).json(Object.values(groupedStories))
  } catch (error) {
    return res.status(500).json({ message: `Get stories error: ${error}` })
  }
}

// Mark story as viewed
export const viewStory = async (req, res) => {
  try {
    const { storyId } = req.params
    
    const story = await Story.findById(storyId)
    
    if (!story) {
      return res.status(404).json({ message: "Story not found" })
    }

    // Check if user already viewed
    const alreadyViewed = story.viewers.some(
      id => id.toString() === req.userId.toString()
    )

    if (!alreadyViewed) {
      story.viewers.push(req.userId)
      await story.save()
    }

    await story.populate("author", "name userName profileImage")
    await story.populate("viewers", "name userName profileImage")
    
    return res.status(200).json(story)
  } catch (error) {
    return res.status(500).json({ message: `View story error: ${error}` })
  }
}

// Delete Story
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params
    
    const story = await Story.findById(storyId)
    
    if (!story) {
      return res.status(404).json({ message: "Story not found" })
    }

    // Only author can delete their story
    if (story.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await Story.findByIdAndDelete(storyId)
    
    // Remove from user's stories array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { stories: storyId }
    })
    
    return res.status(200).json({ message: "Story deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: `Delete story error: ${error}` })
  }
}
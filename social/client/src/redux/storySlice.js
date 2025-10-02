import { createSlice } from "@reduxjs/toolkit"

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: [], // Array of grouped stories by user
  },
  reducers: {
    setStoryData: (state, action) => {
      state.storyData = action.payload
    },
    
    addStory: (state, action) => {
      const newStory = action.payload
      const userStoryIndex = state.storyData.findIndex(
        group => group.user._id === newStory.author._id
      )
      
      if (userStoryIndex !== -1) {
        // Add to existing user's stories
        state.storyData[userStoryIndex].stories.unshift(newStory)
      } else {
        // Create new user story group
        state.storyData.unshift({
          user: newStory.author,
          stories: [newStory]
        })
      }
    },
    
    updateStoryViews: (state, action) => {
      const updatedStory = action.payload
      state.storyData.forEach(group => {
        const storyIndex = group.stories.findIndex(
          story => story._id === updatedStory._id
        )
        if (storyIndex !== -1) {
          group.stories[storyIndex] = updatedStory
        }
      })
    },
    
    removeStory: (state, action) => {
      const storyId = action.payload
      state.storyData.forEach(group => {
        group.stories = group.stories.filter(story => story._id !== storyId)
      })
      // Remove empty groups
      state.storyData = state.storyData.filter(group => group.stories.length > 0)
    }
  }
})

export const { setStoryData, addStory, updateStoryViews, removeStory } = storySlice.actions
export default storySlice.reducer
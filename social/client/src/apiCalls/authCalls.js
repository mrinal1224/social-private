import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth APIs
export const signUpUser = async ({ name, userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const loginUser = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Invalid username or password";
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/signout", {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/current', { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};

export const getSuggestions = async () => {
  try {
    const response = await api.get(`/api/user/suggested`)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}



export const getProfile = async (userName) => {
  try {
    const response = await api.get(`/api/user/getProfile/${userName}`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}

export const editProfile = async (formData) => {
  try {
    const response = await api.post(`/api/user/editprofile`, formData, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}

// Post APIs
export const getAllPosts = async () => {
  try {
    const response = await api.get(`/api/post/getAll`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user posts data"
  }
}

export const getExplorePosts = async () => {
  try {
    const response = await api.get(`/api/post/explore`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch explore posts"
  }
}

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/api/post/like/${postId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to like post";
  }
}

export const commentOnPost = async (postId, message) => {
  try {
    const response = await api.post(`/api/post/comment/${postId}`, { message }, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to comment on post";
  }
}

// Follow APIs
export const followUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to follow user";
  }
}

export const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/unfollow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to unfollow user";
  }
}

export const getFollowStatus = async (userId) => {
  try {
    const response = await api.get(`/api/follow/status/${userId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to get follow status";
  }
}

// Story APIs
export const uploadStory = async (formData) => {
  try {
    const response = await api.post(`/api/story/upload`, formData, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to upload story";
  }
}

export const getAllStories = async () => {
  try {
    const response = await api.get(`/api/story/getAll`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch stories";
  }
}

export const viewStory = async (storyId) => {
  try {
    const response = await api.post(`/api/story/view/${storyId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to view story";
  }
}

export const deleteStory = async (storyId) => {
  try {
    const response = await api.delete(`/api/story/delete/${storyId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete story";
  }
}
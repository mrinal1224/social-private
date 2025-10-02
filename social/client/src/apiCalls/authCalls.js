import axios from "axios";
import { API_BASE_URL } from "./config";
import EditProfile from "../pages/EditProfile";

// axios instance for cleaner code (optional, but good practice)
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

// Sign Up API
export const signUpUser = async ({ name, userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const loginUser = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", {
      userName,
      password,
    });
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Invalid username or password";
  }
};

export const getCurrentUser = async ()=>{
  try {
    const response = await api.get('/api/user/current', {withCredentials:true})
    return response.data
  } catch (error) {
     throw error.response?.data?.message || "Failed to fetch user data";
  }
};  


export const getProfile = async(userName)=>{
  try {
    const response =  await api.get(`/api/user/getProfile/${userName}` , {withCredentials:true})
    return response.data
  } catch (error) {
     throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}

export const editProfile = async(formData)=>{
   try {
    const response =  await api.post(`/api/user/editprofile` , formData, {withCredentials:true})
    return response.data
  } catch (error) {
     throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}

export const getAllPosts = async()=>{
    try {
    const response =  await api.get(`/api/post/getAll`)
    console.log(response)
    return response.data
  } catch (error) {
     throw error.response?.data?.message || "Failed to fetch user posts data"
  }
}







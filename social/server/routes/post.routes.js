import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { comment, getAllPosts, like, uploadPost , getExplorePosts } from "../controllers/post.controllers.js"

const postRouter = express.Router()

postRouter.post("/upload", isAuth, upload.single("media"), uploadPost)
postRouter.get("/getAll", isAuth, getAllPosts)
postRouter.post("/like/:postId", isAuth, like)
postRouter.get("/explore", isAuth, getExplorePosts) 
postRouter.post("/comment/:postId", isAuth, comment)

export default postRouter

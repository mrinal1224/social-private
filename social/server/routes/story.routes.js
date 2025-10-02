
import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { uploadStory, getAllStories, viewStory, deleteStory } from "../controllers/story.controllers.js"

const storyRouter = express.Router()

storyRouter.post("/upload", isAuth, upload.single("media"), uploadStory)
storyRouter.get("/getAll", isAuth, getAllStories)
storyRouter.post("/view/:storyId", isAuth, viewStory)
storyRouter.delete("/delete/:storyId", isAuth, deleteStory)

export default storyRouter
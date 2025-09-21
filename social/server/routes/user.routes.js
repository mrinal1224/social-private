import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  editProfile,
  getCurrentUser,
  getProfile,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);

userRouter.post(
  "/editProfile",
  isAuth,
  upload.single("profileImage"),
  editProfile
);

userRouter.get(
  "/getProfile/:userName",
  isAuth,
  getProfile
);



export default userRouter;

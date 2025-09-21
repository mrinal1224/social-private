import uploadOnCloud from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    console.log(req.userId);
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const editProfile = async (req , res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }

    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password"
    );

    if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({message:'UserName Already Exists'})

    }

    let profileImage;

    if(req.file){
      profileImage = await uploadOnCloud(req.file.path)
    }

    user.name = name
    user.userName = userName
    user.profileImage = profileImage
    user.gender = gender

    await user.save()

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
  }
};

export const getProfile = async(req , res)=>{
  try {
    const userName = req.params.userName
    console.log("userName from params:", userName);
    const user = await User.findOne({userName}).select('-password')

    if(!user){
            return res.status(400).json({ message: "User Not found" });
    }

    return res.status(200).json(user)
  } catch (error) {
     return res.status(500).json({message:`get Profile Error -> ${error}`})
  }
}

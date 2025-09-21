import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloud = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    fs.unlinkSync(file);

    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    console.error(error);
  }
};

export default uploadOnCloud;

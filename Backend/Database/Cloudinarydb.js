import { v2 as cloudinary } from "cloudinary";
const cloudinaryConfig = () => {
  try {
    cloudinary.config({
      cloud_name: "dqwn1ca31",
      api_key: "566419163738515",
      api_secret: "NnOPCA8M3hD9g70YWDQLTkHsFe4",
    });
    console.log("Connected with cloudinary");
  } catch (error) {
    console.log("Error in connection with cloudinary");
  }
};

export default cloudinaryConfig;

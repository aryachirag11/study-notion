// Importing the Cloudinary module
const cloudinary = require("cloudinary").v2;
// Function to configure and connect to Cloudinary
exports.cloudinaryConnect = () => {
  try {
    // Configuring Cloudinary with credentials from environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
      api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
      api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
    });
  } catch (error) {
    // Logging any errors that occur during configuration
    console.log("Error in configuring cloudinary: ", error);
  }
};

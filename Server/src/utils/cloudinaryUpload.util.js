// Importing the Cloudinary module
const cloudinary = require("cloudinary").v2;

exports.uploadOnCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";
    const response = await cloudinary.uploader.upload(localFilePath, options);
    // fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    return null;
  }
};

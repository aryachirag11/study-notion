// Importing the Cloudinary module
const cloudinary = require("cloudinary").v2;

exports.uploadOnCloudinary = async (file, folder, height, quality) => {
  try {
    // console.log("req received for file upload: " + file);
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";
    // console.log("File : ", file);
    // console.log("options : ", options);
    const response = await cloudinary.uploader.upload(file, options);
    // fs.unlinkSync(localFilePath);
    // console.log("response : ", response);
    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    return null;
  }
};

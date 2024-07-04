const Profile = require("../models/profile.model");
const User = require("../models/user.model");

exports.updateProfile = async (res, req) => {
  try {
    //fetch data
    const {
      gender,
      dateOfBirth = "",
      bio = "",
      contactNumber,
      skills = [],
      socialProfiles = [],
      protfolio = "",
    } = req.body;
    //get userID
    const userID = req.user.id;
    //validate
    if (!userID) {
      return res.status(404).json({
        success: false,
        message: "unable to get user id",
      });
    }
    //find prfile
    const userDetails = await User.findById({ __dirname });
    const profileID = userDetails.additionalDetails;
    //update profile
    const profileDetails = await Profile.findByIdAndUpdate(
      { _id: profileID },
      {
        gender: gender,
        dateOfbirth: dateOfBirth,
        bio: bio,
        contactNumber: contactNumber,
        skills: skills,
        socialProfiles: socialProfiles,
        portfolio: protfolio,
      }
    );
    //return res
    return res.status(200).json({
      success: true,
      message: " profile updated successfully",
      profile: profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (res, req) => {
  try {
    //fetch data
    const userID = req.user.id;
    //validation
    const userDetails = await User.findById(userID);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //delete profile
    const prfileID = userDetails.additionalDetails;
    await Profile.findByIdAndDelete(prfileID);
    //TODO : unenroll user from all courses
    //user delete
    await User.findByIdAndDelete(userID);
    //return res
    //TODO : how to schedule a request for  later in time
    //CRON job : what??
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error : failed to delete user",
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (res, req) => {
  try {
    const userID = req.user.id;

    if (!userID) {
      return res.status(402).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userDetails = await User.findById(userID)
      .populate("additonalDetails")
      .exec();
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Details fetched successfully",
      details: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error : failed to get user details",
      error: error.message,
    });
  }
};

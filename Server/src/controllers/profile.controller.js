const Profile = require("../models/profile.model");
const User = require("../models/user.model");

exports.updateProfile = async (req, res) => {
  try {
    // Destructure data from request body
    const {
      gender,
      dateOfBirth = "", // Default value if not provided
      bio = "",
      contactNumber,
      skills = [],
      socialProfiles = [],
      portfolio = "", // Corrected typo in variable name
    } = req.body;

    // Get user ID from authenticated request
    const userID = req.user.id;

    // Validate user ID
    if (!userID) {
      return res.status(404).json({
        success: false,
        message: "Unable to get user ID",
      });
    }

    // Find user details to get profile ID (assuming additionalDetails holds profile ID)
    const userDetails = await User.findById(userID);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileID = userDetails.additionalDetails;

    // Update profile in database
    const profileDetails = await Profile.findByIdAndUpdate(
      profileID,
      {
        gender: gender,
        dateOfBirth: dateOfBirth,
        bio: bio,
        contactNumber: contactNumber,
        skills: skills,
        socialProfiles: socialProfiles,
        portfolio: portfolio,
      },
      { new: true } // To return the updated document
    );

    // Return success response with updated profile details
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: profileDetails,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
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
    //it is necessary to ensure referential integrity//cascading delete
    //mongoDB doesn't have any in-built operations to perform it;

    //user delete
    //a pre middleware fucntion will remove user from enrolled courses
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

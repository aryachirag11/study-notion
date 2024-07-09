const User = require("../models/user.model");
const mailSender = require("../utils/mailSender.util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    //fetch email
    const { email } = req.body.email;
    if (!email) {
      return res.status(402).json({
        success: false,
        message: "Email is required",
      });
    }

    //check if user exists
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(403).json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email`,
      });
    }

    //generate reset token
    const token = crypto.randomBytes(20).toString("hex");
    //update token in db
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordExpiration: Date.now() + 3600000,
      },
      {
        new: true,
      }
    );

    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send reset link
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    return res.status(200).json({
      success: true,
      message: `Password reset mail sent successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Password reset mail send failed`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //fetch data
    const { newPassword, confirmNewPassword, resetPasswordToken } = req.body;
    //validation
    if (newPassword !== confirmNewPassword) {
      return res.status(402).json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    //get user details
    const user = await User.findOne({ resetPasswordToken });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid link, user not found",
      });
    }
    //check expiration
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: "Token is Expired, Please Regenerate Your Token",
      });
    }

    //check if reset password not equal to current password
    const isSamePassword = await bcrypt.compare(user.password, newPassword);
    if (isSamePassword) {
      return res.status(403).json({
        success: false,
        message: "Please use a password different from last used passwords",
      });
    }

    //hash new password
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    //update the details
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        password: newHashPassword,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};

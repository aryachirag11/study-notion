const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const Profile = require("../models/profile.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//sentOTP
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from req body
    const { email } = req.body;

    //check if user exists
    const checkUserPresent = await User.findOne({ email });

    //if user exists, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User with email already registered",
      });
    }
    //TODO : improve this logic
    //generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabet: false,
      lowerCaseAlphabet: false,
      specialChars: false,
    });
    //check if otp is unique
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabet: false,
        lowerCaseAlphabet: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    //create a playlaod for otp
    const otpPlaylaod = { email, otp };

    //create entry in DB
    const otpBody = await OTP.create(otpPlaylaod);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      data: otpBody,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating OTP, error: " + error.message,
    });
  }
};

//signup
exports.userSignup = async (req, res) => {
  try {
    //fetch data from req
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    //validate data
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).josn({
        success: false,
        message: "Please enter all the required fields",
      });
    }

    // check confirm password
    if (password !== confirmPassword) {
      return res.status(403).josn({
        success: false,
        message: "Password mismatch",
      });
    }
    //check if user already exists
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.status(400).josn({
        success: false,
        message: "User already registered",
      });
    }
    //fetch the most recent otp
    const mostRecentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(mostRecentOTP);
    //validate the most recent with req otp
    if (mostRecentOTP.length === 0) {
      return res.status(400).josn({
        success: false,
        message: "No OTP found associated with users",
      });
    } else if (otp !== mostRecentOTP) {
      return res.status(400).josn({
        success: false,
        message: "Wrong OTP, mismatch",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create empty user profile
    const profileDeatils = await Profile.create({
      gender: null,
      dateofbirth: null,
      bio: null,
      contactNumber: null,
      portfolio: null,
      skills: [],
      socialProfils: [],
    });
    //create entry in DB
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDeatils._id,
      avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Failed to store profile in DB",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user" + error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    //fetch data from req body
    const { email, password } = req.body;
    //validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please all required fields",
      });
    }
    //check if user exists
    const existedUser = await User.findOne({ email }).populate(
      "additionalDetails"
    );
    if (!existedUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    //check password
    const isPasswordValid = await bcrypt.compare(
      existedUser.password,
      password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    //generate token
    const payload = {
      email: existedUser.email,
      id: existedUser._id,
      role: existedUser.accountType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    existedUser.accessToken = token;
    await existedUser.save();

    //get logged in user
    const loggedInUser = await User.findById(existedUser._id).select(
      "-password -accessToken"
    );
    //cookie option
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    //send response
    return res.status(200).cookie("accessToken", token, options).json({
      success: true,
      user: loggedInUser,
      accessToken: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not logged in successfully" + error.message,
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "please enter all required fields",
      });
    }
    if (confirmNewPassword !== newPassword)
      return res.status(401).json({
        success: false,
        message: "Confirm Password Mismatch",
      });

    const user = await User.findById(req.user?._id);

    const isPasswordValid = await bcrypt.compare(user.password, oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password",
      });
    }
    //hash new password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashNewPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating new password" + error.message,
    });
  }
};

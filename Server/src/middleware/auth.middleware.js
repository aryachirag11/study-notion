const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

exports.authenticateUser = async (req, res, next) => {
  try {
    //extract token
    const incomingToken =
      req.body.accessToken ||
      req.cookies.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
    // console.log(req.body.accessToken);
    // console.log(req.cookies.accessToken);
    // console.log(req.header("Authorization").replace("Bearer ", ""));
    //check if token present
    if (!incomingToken) {
      return res.status(401).json({
        success: false,
        message: "missing token",
      });
    }
    //verify token
    const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }
    // console.log(decodedToken);
    // check if token is realted to some user
    const user = await User.findById(decodedToken?.id).select(
      "-password -accessToken"
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found,  invalid token for the user",
      });
    }
    // console.log(
    //   "-------------------------------------------------------------------------------------"
    // );
    req.user = user;
    // console.log("req user : ", req.user);
    // console.log(
    //   "-------------------------------------------------------------------------------------"
    // );
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not able to authenticate",
      message: error?.message,
    });
  }
};

exports.verifyStudent = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Secured route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Student verification failed",
    });
  }
};

exports.verifyInstructor = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Secured route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Instructor verification failed",
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Secured route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Admin verification failed",
    });
  }
};

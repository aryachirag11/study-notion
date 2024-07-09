// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  userLogin,
  userSignup,
  sendOTP,
  changePassword,
} = require("../controllers/userAuth.controller");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword.controller");

const { authenticateUser } = require("../middleware/auth.middleware");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", userLogin);

// Route for user signup
router.post("/signup", userSignup);

// Route for sending OTP to the user's email
router.post("/sendOTP", sendOTP);

// Route for Changing the password
router.post("/changepassword", authenticateUser, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;

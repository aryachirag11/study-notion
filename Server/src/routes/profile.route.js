const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth.middleware");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/profile.controller");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", authenticateUser, deleteAccount);
router.put("/updateProfile", authenticateUser, updateProfile);
router.get("/getUserDetails", authenticateUser, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", authenticateUser, getEnrolledCourses);
router.put("/updateDisplayPicture", authenticateUser, updateDisplayPicture);

module.exports = router;

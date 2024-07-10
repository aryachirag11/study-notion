// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/course.controller");

// Categories Controllers Import
const {
  getAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/category.controller");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section.controller");

// Sub-Sections Controllers Import
const {
  createSubsection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subsection.controller");

// Rating Controllers Import
const {
  createRating,
  getAvgRating,
  getAllRatingAndReview,
} = require("../controllers/ratingAndReview.controller");

// Importing Middlewares
const {
  authenticateUser,
  verifyInstructor,
  verifyStudent,
  verifyAdmin,
} = require("../middleware/auth.middleware");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", authenticateUser, verifyInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", authenticateUser, verifyInstructor, createSection);
// Update a Section
router.put("/updateSection", authenticateUser, verifyInstructor, updateSection);
// Delete a Section
router.post(
  "/deleteSection",
  authenticateUser,
  verifyInstructor,
  deleteSection
);
// Edit Sub Section
router.put(
  "/updateSubSection",
  authenticateUser,
  verifyInstructor,
  updateSubSection
);
// Delete Sub Section
router.post(
  "/deleteSubSection",
  authenticateUser,
  verifyInstructor,
  deleteSubSection
);
// Add a Sub Section to a Section
router.post(
  "/addSubSection",
  authenticateUser,
  verifyInstructor,
  createSubsection
);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", authenticateUser, verifyAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", authenticateUser, verifyStudent, createRating);
router.get("/getAverageRating", getAvgRating);
router.get("/getReviews", getAllRatingAndReview);

module.exports = router;

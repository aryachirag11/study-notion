// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifySignature,
} = require("../controllers/razorpay.controller");
const {
  authenticateUser,
  verifyInstructor,
  verifyStudent,
  verifyAdmin,
} = require("../middleware/auth.middleware");
router.post("/capturePayment", authenticateUser, verifyStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;

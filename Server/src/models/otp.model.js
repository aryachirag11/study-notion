const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.util");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expiration: 5 * 60,
  },
});

async function sendVerificationEmail(email, opt) {
  try {
    const maileResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otp
    );
    console.log("Email sent succesfully", maileResponse);
  } catch (error) {
    console.log("Error sending verification email : ", error);
    throw error;
  }
}
otpSchema.prev("save", async (next) => {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);

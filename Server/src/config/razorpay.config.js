const Razorpay = require("razorpay");

exports.razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAYR_KEY,
  key_secret: process.env.RAZORPAYR_KEY,
});

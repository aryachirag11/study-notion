const { razorpayInstance } = require("../config/razorpay.config");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const mailSender = require("../utils/mailSender.util");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollment.template");

exports.capturePayment = async (req, res) => {
  try {
    //get userID and courseID
    const { courseID } = req.body;
    const userID = req.user.id;
    //validate userID and courseID
    if (!courseID && !userID) {
      return res.status(402).json({
        success: false,
        message: "Please enter courseID and userID",
      });
    }
    //find course details using courseID
    const courseDetails = await Course.findById(courseID);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid courseID course not found",
      });
    }
    //user already enrolled
    userID = new mongoose.Types.ObjectId(userID);
    const alreadyEnrolled = courseDetails.studentsEnrolled.includes(userID);
    if (alreadyEnrolled) {
      return res.status(401).json({
        success: false,
        message: "User alreay enrolled in course",
      });
    }
    //create order
    const amount = courseDetails.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseID: courseDetails._id,
        userID,
      },
    };
    //initiate payment using razorpay
    const paymentResponse = await razorpayInstance.create(options);
    if (!paymentResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to create razorpay payment order",
      });
    }
    console.log(paymentResponse);

    //return res

    return res.status(200).json({
      success: true,
      message: "Razorpay payment excecuted Successfully",
      courseName: courseDetails.courseName,
      courseDescription: courseDetails.courseDescription,
      thumbnail: courseDetails.thumbnail,
      orderID: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log("Razorpay Error: " + error);
    return res.status(500).json({
      success: false,
      message: "Failed to make razorpay payment",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "1234ABCD";

  const signature = req.headers["x-razorpay-signature"];

  const shaSum = crypto.createHmac("sha256", webhookSecret);

  shaSum.update(JSON.stringify(req.body));

  const digest = shaSum.digest("hex");

  if (signature === shaSum) {
    console.log("Payment authorized");

    const { courseID, userID } = req.body.payload.payment.entity.notes;

    try {
      //find the course and enroll user in course
      const courseEnrolled = await Course.findByIdAndUpdate(
        courseID,
        {
          $push: { studentsEnrolled: userID },
        },
        { new: true }
      );
      if (!courseEnrolled) {
        return res.status(500).json({
          success: false,
          message: "Course not found, failed to enroll student",
        });
      }
      //add course in user courses
      const userEnrolled = await User.findByIdAndUpdate(
        userID,
        { $push: { courses: courseEnrolled._id } },
        { new: true }
      );
      if (!userEnrolled) {
        return res.status(500).json({
          success: false,
          message: "User not found, failed to add course to user",
        });
      }
      //send confirmation mail
      const emailResponse = await mailSender(
        userEnrolled.email,
        "Congratulations, welcome aboard",
        "You are enrolled in the coourse successfully, thank you for your purscription"
      );

      return res.status(200).json({
        success: true,
        message: "User enrolled in the course successfully,",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "User enrollment failed",
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "Signature verification failed",
    });
  }
};

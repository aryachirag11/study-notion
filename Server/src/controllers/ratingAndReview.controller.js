const RatingAndReview = require("../models/ratingandreviw.model");
const Course = require("../models/course.model");
const { mongo, default: mongoose } = require("mongoose");

//create rating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userID = req.user.id;
    //fetch data from req body
    const { rating, review, courseID } = req.body;
    //check if user is enrolled or not
    const courseDetails = await Course.findById({
      _id: courseID,
      studentsEnrolled: { $elemMatch: { $eq: userID } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }
    //check if user has already reviewed
    const alreadyReviewedCourse = await RatingAndReview.findOne({
      user: userID,
      course: courseID,
    });
    if (alreadyReviewedCourse) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by the user",
      });
    }
    //create a new rating
    const ratingReview = await RatingAndReview.create({
      user: userID,
      rating: rating,
      review: review,
      course: courseID,
    });
    if (!ratingReview) {
      return res.status(500).json({
        success: false,
        message: "Failed to create rating and review",
      });
    }
    //push new rating to courseSchema
    const reviewedCourse = await Course.findByIdAndUpdate(
      { _id: courseID },
      {
        $push: {
          ratingAndReview: ratingReview._id,
        },
      },
      { new: true }
    );
    if (!reviewedCourse) {
      return res.status(500).json({
        success: false,
        message: "Failed to add rating and review to the course",
      });
    }
    //return res
    return res.status(200).json({
      success: true,
      message: "Rating and Reviews added successfully to the course",
      course: reviewedCourse,
      ratingReview: ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "InternalError :: Failed to add rating and review to the course",
    });
  }
};
//get avgRating
exports.getAvgRating = async (req, res) => {
  try {
    //get courseID
    const courseID = req.body.courseID;
    if (!courseID) {
      return res.status(404).json({
        success: false,
        message: "Course ID not found",
      });
    }
    //calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseID),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Average rating is 0, no rating is available",
      averageRating: 0,
    });
    //return rating
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error :: failed to get average rating",
    });
  }
};

//get all rating
exports.getAllRatingAndReview = async (req, res) => {
  try {
    const { courseID = "" } = req.body;
    if (courseID) {
    } else {
      const allReview = await RatingAndReview.find({})
        .sort({ rating: "desc" })
        .populate({
          path: "user",
          select: "firstName lastName email avatar",
        })
        .populate({
          path: "course",
          select: "courseName",
        })
        .exec();
    }

    //get all ratings for the course
    return res.status(200).json({
      success: true,
      message: "All ratings fetched successfully",
      ratings: allReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all ratings for the course",
    });
  }
};

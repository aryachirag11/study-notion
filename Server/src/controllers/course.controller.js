const Course = require("../models/course.model ");
const Tag = require("../models/tag.model");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/imageUpload.util");

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check instructor
    const userID = req.user._id;
    const instructorDetails = await User.findById(userID);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //chech for tag
    const tagDetails = await User.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }
    //upload on cloudinary
    const thumbnailImage = await uploadOnCloudinary(
      thumbnail.tempFilePath,
      process.env.FOLDER_NAME
    );

    if (!thumbnailImage) {
      return res.status(402).json({
        success: false,
        message: "Image upload on cloudinary failed ",
      });
    }

    //create enrty in DB
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      intructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add course to instructor schema
    await User.findById(
      { _id: instructor._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );
    //update tag schema
    await Tag.findById(
      { _id: tagDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );
    //return response
    return res.status(200).json({
      success: true,
      course: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

exports.getAllCourses = async (res, req) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    if (!allCourses) {
      return (
        res.status(500),
        json({
          success: false,
          message: "Failed to get all courese from DB",
        })
      );
    }

    return res.status(200).json({
      success: true,
      courses: allCourses,
      message: "All courses fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all courses : " + error.message,
    });
  }
};

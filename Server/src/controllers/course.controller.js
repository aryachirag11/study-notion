const Course = require("../models/course.model ");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const { uploadOnCloudinary } = require("../utils/imageUpload.util");

exports.createCourse = async (req, res) => {
  try {
    const userID = req.user.id;
    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userID, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }
    // Check if the category given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    //upload on cloudinary
    const thumbnailImage = await uploadOnCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // if (!thumbnailImage) {
    //   return res.status(402).json({
    //     success: false,
    //     message: "Image upload on cloudinary failed ",
    //   });
    // }

    //create enrty in DB
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      intructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    //add course to instructor schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
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
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
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

exports.getCourseDetails = async (req, res) => {
  try {
    //fetch data
    const { courseID } = req.body;
    //validate
    if (!courseID) {
      return res.status(401).json({
        success: false,
        message: "CourseID is required",
      });
    }
    //find course and populate all fields
    const courseDetails = await Course.findById({ _id: courseID })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exce();
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course details with id ${courseID}.`,
      });
    }
    //return res
    return res.status(200).json({
      success: true,
      message: `Course deatils were successfully fetched`,
      courseDetails: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course deatils, some internal error occurred",
    });
  }
};

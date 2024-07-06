const Section = require("../models/section.model");
const Course = require("../models/course.model");

exports.createSection = async (req, res) => {
  try {
    //fetc data
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId)
      return res.status(403).json({
        success: false,
        message: "Please enter all details",
      });
    //create Section
    const section = await Section.create({ sectionName });
    if (!section) {
      return res.status(500).json({
        success: false,
        message: "Failed top create a new section",
      });
    }

    //update course
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: section._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();
    //TODO : how to populate section and subsection
    if (!updatedCourse) {
      return res.status(500).json({
        success: false,
        message: "Failed to update course",
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourse: updatedCourse,
      section: section,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionID } = req.body;

    // Validation
    if (!sectionName || !sectionID) {
      return res.status(400).json({
        success: false,
        message: "Please provide a section name and a section ID",
      });
    }

    // Update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      { sectionName },
      { new: true } // Return the updated document
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found or failed to update",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong and failed to update section",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const sectionID = req.params.id; // Assuming section ID is passed as a route parameter

    // Validation
    if (!sectionID) {
      return res.status(400).json({
        success: false,
        message: "Section ID not provided",
      });
    }

    // Delete section
    const deletedSection = await Section.findByIdAndDelete(sectionID);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found or failed to delete",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong and failed to delete section",
    });
  }
};

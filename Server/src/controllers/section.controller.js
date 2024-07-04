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
    ).populate("courseContent");
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
    //fetch data
    const { sectionName, sectionID } = req.body;
    //validation
    if (!sectionName || !sectionID) {
      return res.status(404).json({
        success: false,
        message: "please provide a section name and a section ID",
      });
    }
    //update section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionID },
      {
        sectionName: sectionName,
      },
      {
        new: true,
      }
    );
    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Failed to update section",
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      message: "Updated section successfully",
      section: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong and Failed to update section",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //fetch data
    const sectionID = req.params;

    if (!sectionID) {
      return res.status(404).json({
        success: false,
        message: "Section Id not found",
      });
    }

    await Section.findByIdAndDelete({ _id: sectionID });

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong and Failed to delete section",
    });
  }
};

const Section = require("../models/subsection.model");
const SubSection = require("../models/section.model");
const { uploadOnCloudinary } = require("../utils/cloudinaryUpload.util");

exports.createSubsection = async (req, res) => {
  try {
    //fetch data
    const { sectionID, title, timeDuration } = req.body;
    if (!sectionID || !title || !description) {
      return res.status(404).json({
        success: false,
        message: " Please enter all required fields",
      });
    }
    //extract video file
    const video = req.files.videoFile;
    //validation
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video file is missing",
      });
    }
    console.log(video);
    //upload video on cloudinary
    const uploadVideo = await uploadOnCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );
    if (!uploadVideo) {
      return res.status(501).json({
        success: false,
        message: "Video file upload on cloudinary failed",
      });
    }
    console.log(uploadVideo);
    //create a subsection
    const newSubsection = await Subsection.create({
      title: title,
      timeDuration: `${uploadVideo.duration}`,
      description: description,
      videoUrl: uploadVideo.secure_url,
    });
    if (!newSubsection) {
      return res.status(501).json({
        success: false,
        message: "Falied to save subsection in Db",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionID },
      {
        $push: {
          subSection: newSubsection._id,
        },
      },
      { new: true }
    );
    if (!updatedSection) {
      return res.staus(502).json({
        success: false,
        message: "Failed to update section with subsection",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Created subsection successfully",
      section: updatedSection,
      subSection: newSubsection,
    });
    //add subsection to section
    //return res
  } catch (error) {
    return res.staus(500).json({
      success: false,
      message: "Failed to create subsection",
    });
  }
};
//Home work
//update subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subsectionID } = req.body;
    const subSection = await SubSection.findById(subsectionID);

    // Validation
    if (!subsectionID) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID not provided",
      });
    }

    // Prepare update object with provided fields
    // const updateFields = {};
    if (title) subSection.title = title;
    if (description) subSection.description = description;
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadOnCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    // Update SubSection
    await subSection.save();

    // if (!updatedSubSection) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "SubSection not found or failed to update",
    //   });
    // }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      subsection: updatedSubSection,
    });
  } catch (error) {
    console.error("Error updating SubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong and failed to update SubSection",
    });
  }
};
//delete section
exports.deleteSubSection = async (req, res) => {
  try {
    const subsectionID = req.body; // Assuming SubSection ID is passed as a route parameter

    // Validation
    if (!subsectionID) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID not provided",
      });
    }

    // Delete SubSection
    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionID);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found or failed to delete",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting SubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong and failed to delete SubSection",
    });
  }
};

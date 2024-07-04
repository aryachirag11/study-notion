const Section = require("../models/subsection.model");
const Subsection = require("../models/section.model");
const uploadOnCloudinary = require("../utils/cloudinaryUpload.util");

exports.createSubsection = async (req, res) => {
  try {
    //fetch data
    const { sectionID, title, timeDuration, description } = req.body;
    if (!sectionID || !title || !timeDuration || !description) {
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
    //create a subsection
    const newSubsection = await Subsection.create({
      title: title,
      timeDuration: timeDuration,
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
//delete section

const Tag = require("../models/tag.model");

exports.createTag = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    //create tag object
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    if (!tagDetails) {
      return res.status(500).json({
        success: false,
        message: "Saving tag details failed",
      });
    }

    //return response
    return res.status(200).json({
      success: true,
      tags: tagDetails,
      message: "Tag details saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating tag" + error.message,
    });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });

    if (!allTags) {
      return res.status(402).json({
        success: false,
        message: "Error while getting from DB",
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      tags: allTags,
      message: "All tags fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all tags" + error.message,
    });
  }
};

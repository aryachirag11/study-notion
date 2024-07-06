const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
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
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    if (!categoryDetails) {
      return res.status(500).json({
        success: false,
        message: "Saving category details failed",
      });
    }

    //return response
    return res.status(200).json({
      success: true,
      tags: categoryDetails,
      message: "Category details saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating category" + error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    if (!allCategories) {
      return res.status(402).json({
        success: false,
        message: "Error while getting from DB",
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      tags: allCategories,
      message: "All categories fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all categories" + error.message,
    });
  }
};

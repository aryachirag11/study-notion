const mongoose = require("mongoose");
const Section = require("./section.model");

const subsectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

subsectionSchema.pre("remove", async function (next) {
  try {
    await Section.updateMany(
      { subSection: this._id },
      { $pull: { subSection: this._id } }
    );
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("SubSection", subsectionSchema);

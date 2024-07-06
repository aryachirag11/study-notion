const mongoose = require("mongoose");
const Course = require("./course.model");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});
sectionSchema.pre("remove", async function (next) {
  try {
    await Course.updateMany(
      { courseContent: this._id },
      { $pull: { courseContent: this._id } }
    );
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Section", sectionSchema);

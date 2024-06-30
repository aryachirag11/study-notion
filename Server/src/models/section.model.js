const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({
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

module.exports = mongoose.model("SubSection", subsectionSchema);

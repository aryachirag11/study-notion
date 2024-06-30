const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateofbirth: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  socialProfils: [
    {
      type: String,
      trim: true,
    },
  ],
  portfolio: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);

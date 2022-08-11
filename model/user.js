const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);

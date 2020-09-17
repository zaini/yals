const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  ID: {
    type: String,
    required: [false, "Link must have an ID"], // ID will be generated automatically
  },
  Created_By: {
    type: String,
    required: [false],
  },
  Created_At: {
    type: Number,
    require: [true, "Link must have a creation date"],
  },
  Expires_At: {
    type: Number,
    require: [false],
  },
  Base_URL: {
    type: String,
    require: [true, "Link must contain a Base_URL"],
  },
  Short_URL: {
    type: String,
    required: [true, "Link must contain Short_URL"],
  },
});

const Link = mongoose.model("link", LinkSchema);

module.exports = Link;

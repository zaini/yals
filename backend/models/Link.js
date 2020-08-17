const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  ID: {
    type: String,
    required: [false, "Link must have an ID"],
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

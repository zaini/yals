const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  ID: {
    type: String,
    required: [false, "User must have an ID"],
  },
  Created_At: {
    type: Date,
    require: [true, "User must have a creation date"],
  },
  Email: {
    type: String,
    unique: true,
    require: [true, "User musth ave an email"],
  },
  UserName: {
    type: String,
    required: [true, "User must have a username"],
  },
  Password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

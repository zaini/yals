const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  ID: {
    type: String,
    required: [false, "Message must have an ID"],
  },
  Send_At: {
    type: Date,
    require: [true, "Message must have a sent time"],
  },
  Name: {
    type: String,
    unique: true,
    require: [true, "Message must have a sender name"],
  },
  Email: {
    type: String,
    required: [true, "Message must have an email"],
  },
  Subject: {
    type: String,
    required: false,
  },
  Message: {
    type: String,
    required: [true, "Message must have a message"],
  },
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;

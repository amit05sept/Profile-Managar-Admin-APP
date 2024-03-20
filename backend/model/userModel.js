const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 4,
    required: true,
  },
  description: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  links: {
    type: Array,
  },
  interests: {
    type: Array,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;

// user model
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  email: {
    type: String,
    unique: [true, "email address already exists"],
    required: [true, "email address is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

module.exports = mongoose.model("User", UserSchema);

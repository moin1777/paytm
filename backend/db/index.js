const mongoose = require("mongoose");

mongoose.connect("mongoDB url");

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}
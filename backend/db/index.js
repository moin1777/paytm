const mongoose = require("mongoose");
const {mongoDB_url} = require("../config");

mongoose.connect(mongoDB_url);

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
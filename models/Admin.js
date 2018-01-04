const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    //validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address"
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true
  },
  username: {
    type: String,
    required: "Please supply a username",
    trim: true
  }
});

adminSchema.plugin(passportLocalMongoose);
adminSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: 'Give us a real email, pls.'
    },
    required: 'Please Supply an email address'
  },
  firstName: {
    type: String,
    required: 'Please supply a first name!',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please supply a last name!',
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
adminSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Admin', adminSchema);

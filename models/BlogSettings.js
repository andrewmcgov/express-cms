const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const settingsSchema = new mongoose.Schema({
  header_menu: String,
  footer_menu: String,
  featuredImage: String
});

module.exports = mongoose.model('blogSettings', settingsSchema);

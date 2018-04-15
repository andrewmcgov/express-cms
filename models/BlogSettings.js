const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const settingsSchema = new mongoose.Schema({
  header_menu: mongoose.Schema.ObjectId,
  footer_menu: mongoose.Schema.ObjectId
});

module.exports = mongoose.model('blogSettings', settingsSchema);

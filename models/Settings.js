const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const settingsSchema = new mongoose.Schema({
  // email: String,
  inviteAdminToken: String,
  inviteAdminExpires: Date
});

module.exports = mongoose.model('Settings', settingsSchema);

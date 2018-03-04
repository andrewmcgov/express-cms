const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'All Meus need a title!'
  },
  menuItems: [
    {
      name: String,
      url: String
    }
  ]
});

module.exports = mongoose.model('Menu', menuSchema);

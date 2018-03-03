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

// menuSchema.pre('save', async function(next) {
//   // slugify the title
//   this.slug = slug(this.title, { lower: true, replacement: '-' });
//   const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
//   const menusWithSlug = await this.constructor.find({ slug: slugRegEx });
//   if (menusWithSlug.length) {
//     this.slug = `${this.slug}-${menusWithSlug.length + 1}`;
//   }
//   next();
// });

module.exports = mongoose.model('Menu', menuSchema);

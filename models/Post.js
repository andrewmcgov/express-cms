const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");

// http://mongoosejs.com/docs/2.7.x/docs/schematypes.html

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "All posts need titles"
  },
  slug: String,
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  photo: String,
  // we still need to make an author
  content: {
    type: String,
    required: "Please add some content"
  },
  preview: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: 'You must supply an author!'
  }
});

// do some stuff before we save the post

postSchema.pre("save", async function(next) {
  // slugify the title
  this.slug = slug(this.title, { lower: true, replacement: "-" });
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  const postsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (postsWithSlug.length) {
    this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

async function getPostsByAuthor(id) {
  const posts = await Post.find({ author: id });
  return posts;
}

exports.loadIndex = async (req, res) => {
  const posts = await Post.find();
  res.render("index", { title: "Our CMS", posts });
};

exports.loadAdmin = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  res.render("adminHome", { title: "Welcome, Admin", posts });
};

exports.addPost = (req, res) => {
  res.render("adminNewPost", { title: "Welcome, Admin" });
};

exports.writePost = async (req, res) => {
  req.body.author = req.user._id;
  const post = await new Post(req.body).save();
  res.redirect("/admin");
};

const confirmOwner = (post, admin) => {
  if (!post.author.equals(admin._id)) {
    throw Error("You must be the author of the post to edit it!");
  }
};

exports.editPost = async (req, res) => {
  // Find the right store to edit
  const post = await Post.findOne({ slug: req.params.slug });
  // ensure that the user is tha author of the post
  confirmOwner(post, req.user);
  res.render("adminEditPost", { title: "Edit Post", post });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash("success", `Successfully updated ${post.title}`);
  res.redirect(`/posts/${post.slug}`);
};

exports.singlePost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate("author");

  if (!post) return next();
  res.render("singlePost", { post, title: post.title });
};

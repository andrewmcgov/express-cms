const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.loadIndex = async (req, res) => {
  const posts = await Post.find();
  res.render("index", { title: "Our CMS", posts });
};
exports.loadAdmin = (req, res) => {
  res.render("adminHome", { title: "Welcome, Admin" });
};

exports.addPost = (req, res) => {
  res.render("adminNewPost", { title: "Welcome, Admin" });
};

exports.writePost = async (req, res) => {
  const post = await new Post(req.body).save();
  res.redirect("/admin");
};

exports.singlePost = async (req, res) => {
  console.log("singlePost runs");
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) return next();
  res.render("singlePost", { post, title: post.title });
};

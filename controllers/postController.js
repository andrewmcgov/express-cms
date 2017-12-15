const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.addPost = (req, res) => {
  res.render("adminNewPost", { title: "Welcome, Admin" });
};

exports.writePost = async (req, res) => {
  console.log("coming frolm write post");
  const post = await new Post(req.body).save();
  res.redirect("/admin");
};

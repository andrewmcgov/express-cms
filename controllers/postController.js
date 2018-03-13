const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');

// Configuratino for multer - allow only image files to be uploaded
const multerOptions = {
  storage: multer.memoryStorage(),
  function(req, file, next) {
    // check the file type of the image
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('featuredImage');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.featuredImage = `${uuid.v4()}.${extension}`;
  // get file from the buffer which is on the req.body
  const photo = await jimp.read(req.file.buffer);
  // resize the photo
  await photo.resize(800, jimp.AUTO);
  // write the photo to the disk
  await photo.write(`./public/uploads/${req.body.featuredImage}`);
  // once we have written the photo to the filesystem, keep going!
  next();
};

exports.loadIndex = async (req, res) => {
  const posts = await Post.find();
  res.render('index', { title: 'Our CMS', posts });
};

exports.loadAdmin = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  res.render('adminHome', { title: 'Welcome, Admin', posts });
};

exports.addPost = (req, res) => {
  res.render('adminNewPost', { title: 'Welcome, Admin' });
};

exports.writePost = async (req, res) => {
  req.body.author = req.user._id;
  const post = await new Post(req.body).save();
  res.redirect('/admin');
};

const confirmOwner = (post, admin) => {
  if (!post.author.equals(admin._id)) {
    throw Error('You must be the author of the post to edit it!');
  }
};

exports.editPost = async (req, res) => {
  // Find the right store to edit
  const post = await Post.findOne({ slug: req.params.slug });
  // ensure that the user is tha author of the post
  confirmOwner(post, req.user);
  res.render('adminEditPost', { title: 'Edit Post', post });
};

exports.updatePost = async (req, res) => {
  if (req.body.removeFeaturedImage === 'on') {
    const post = await Post.findOne({ slug: req.params.slug });
    fs.unlink(`public/uploads/${post.featuredImage}`, e => {
      if (e) throw e;
      console.log('Successfully deleted featured image.');
    });
    req.body.featuredImage = '';
  }
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated ${post.title}`);
  res.redirect(`/admin/posts/${post.slug}/edit`);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  req.flash('success', `Successfully deleted ${post.title}`);
  res.redirect('/admin');
};

exports.singlePost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author');

  if (!post) return next();
  res.render('singlePost', { post, title: post.title });
};

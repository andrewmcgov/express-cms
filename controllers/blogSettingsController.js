const mongoose = require('mongoose');
const BlogSettings = mongoose.model('blogSettings');
const Menu = mongoose.model('Menu');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');

const multerOptions = {
  storage: multer.memoryStorage(),
  function(req, file, next) {
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
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.featuredImage = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(1200, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.featuredImage}`);
  next();
};

exports.loadSettings = async (req, res) => {
  const settings = await BlogSettings.find({});
  const menus = await Menu.find({});
  res.render('adminBlogSettings', {
    title: 'Blog Settings',
    menus,
    featuredImage: settings.featuredImage,
    settings: settings.length ? settings[0] : {}
  });
};

exports.saveSettings = async (req, res) => {
  if (req.body.removeFeaturedImage === 'on') {
    const settings = await BlogSettings.findOne({});
    fs.unlink(`public/uploads/${settings.featuredImage}`, e => {
      if (e) throw e;
      console.log('Successfully deleted featured image.');
    });
    req.body.featuredImage = '';
  }
  const settingsCheck = await BlogSettings.find({});
  if (settingsCheck.length) {
    const settings = await BlogSettings.findOneAndUpdate(
      { _id: settingsCheck[0]._id },
      req.body,
      { new: true, runValidators: true }
    ).exec();
  } else {
    const settings = await new BlogSettings(req.body).save();
  }

  req.flash('success', 'Successfully saved blog settings!');
  res.redirect('/admin/blog-settings');
};

exports.getSettings = async (req, res, next) => {
  const dbSettings = await BlogSettings.findOne({});
  const settings = {};
  const headerMenu = await Menu.findOne({ _id: dbSettings.header_menu });
  const footerMenu = await Menu.findOne({ _id: dbSettings.footer_menu });
  settings.headerMenu = headerMenu.menuItems;
  settings.footerMenu = footerMenu.menuItems;
  settings.featuredImage = dbSettings.featuredImage;
  req.settings = settings;
  next();
};

const mongoose = require('mongoose');
const BlogSettings = mongoose.model('blogSettings');
const Menu = mongoose.model('Menu');

exports.loadSettings = async (req, res) => {
  const settings = await BlogSettings.find({});
  const menus = await Menu.find({});
  res.render('adminBlogSettings', {
    title: 'Blog Settings',
    menus,
    settings: settings.length ? settings[0] : {}
  });
};

exports.saveSettings = async (req, res) => {
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
  settings.headerMenu = await Menu.findOne({ _id: dbSettings.header_menu });
  settings.footerMenu = await Menu.findOne({ _id: dbSettings.footer_menu });
  settings.headerMenu = settings.headerMenu.menuItems;
  settings.footerMenu = settings.footerMenu.menuItems;
  req.settings = settings;
  next();
};

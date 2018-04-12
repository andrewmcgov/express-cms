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
  console.log(settingsCheck);
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

const mongoose = require('mongoose');
const Menu = mongoose.model('Menu');
const Post = mongoose.model('Post');

exports.loadMenus = async (req, res, next) => {
  // get all the menys
  const menus = await Menu.find();
  // render the page
  res.render('adminMenus', { title: 'Menus', menus });
};

exports.startNewMenu = async (req, res) => {
  const posts = await Post.find();
  res.render('adminEditMenu', { title: 'Make New Menu', posts });
};

// This function creates the Object to send into the database
// by building the menuItems array from the request
const buildMenuToSave = req => {
  const menuToSave = {
    title: req.body.title,
    menuItems: []
  };
  // Get menu items from request and put them into the menuItems array
  menuToSave.menuItems = req.body.linkName.map((name, i) => {
    return {
      name: name,
      url: req.body.linkUrl[i]
    };
  });
  return menuToSave;
};

exports.saveNewMenu = async (req, res) => {
  const menu = await new Menu(buildMenuToSave(req)).save();
  req.flash('success', `Successfully saved ${menu.title}!`);
  res.redirect('/admin/menus');
};

exports.editMenu = async (req, res) => {
  const posts = await Post.find();
  const menu = await Menu.findOne({ _id: req.params.id });
  res.render('adminEditMenu', { title: `Edit ${menu.title}`, menu, posts });
};

exports.saveExistingMenu = async (req, res) => {
  const menu = await Menu.findOneAndUpdate(
    { _id: req.params.id },
    buildMenuToSave(req),
    {
      new: true,
      runValidators: true
    }
  ).exec();
  req.flash('success', `Successfully updated ${menu.title}!`);
  res.redirect('/admin/menus');
};

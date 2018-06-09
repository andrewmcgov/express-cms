const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const postController = require('../controllers/postController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const menuController = require('../controllers/menuController');
const settingsController = require('../controllers/settingsController');
const blogSettingsController = require('../controllers/blogSettingsController');

/* GET home page. */
router.get(
  '/',
  catchErrors(blogSettingsController.getSettings),
  catchErrors(postController.loadIndex)
);

router.get('/about', function(req, res, next) {
  res.render('page', { title: 'About' });
});

router.get('/admin', authController.isLoggedIn, postController.loadAdmin);

router.get(
  '/admin/new-post',
  authController.isLoggedIn,
  postController.addPost
);

router.post(
  '/admin/new-post',
  authController.isLoggedIn,
  postController.upload,
  catchErrors(postController.resize),
  catchErrors(postController.writePost)
);

router.get(
  '/admin/posts/:slug/edit',
  authController.isLoggedIn,
  catchErrors(postController.editPost)
);

router.post(
  '/admin/new-post/:slug/:id/edit',
  authController.isLoggedIn,
  postController.upload,
  catchErrors(postController.resize),
  catchErrors(postController.updatePost)
);

router.post(
  '/admin/delete-post/:id',
  authController.isLoggedIn,
  catchErrors(postController.deletePost)
);

router.get(
  '/posts/:slug',
  catchErrors(blogSettingsController.getSettings),
  catchErrors(postController.singlePost)
);

router.get('/admin/login', adminController.loginForm);

router.get('/admin/logout', authController.logout);

router.get('/admin/register/:token', adminController.registerForm);

router.post(
  '/admin/register',
  adminController.validateAdmin,
  adminController.handleValidatedData,
  adminController.register,
  authController.login
);

router.post('/admin/login/', authController.login);

router.get('/admin/forgot', function(req, res, next) {
  res.render('forgot', { title: 'Reset Password' });
});

router.post('/admin/forgot', catchErrors(authController.forgotPassword));

router.get('/admin/reset/:token', catchErrors(authController.resetPassword));

router.post(
  '/admin/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

router.post('admin/reset');
router.get('/admin/forgot', catchErrors(authController.forgotPassword));

router.get('/admin/menus', authController.isLoggedIn, menuController.loadMenus);

router.get(
  '/admin/menus/new-menu',
  authController.isLoggedIn,
  menuController.startNewMenu
);

router.get(
  '/admin/menus/:id/edit',
  authController.isLoggedIn,
  menuController.editMenu
);

router.post(
  '/admin/menus/new-menu',
  authController.isLoggedIn,
  menuController.saveNewMenu
);

router.post(
  '/admin/menus/:id/edit',
  authController.isLoggedIn,
  menuController.saveExistingMenu
);

router.get('/admin/admin-panel', authController.isLoggedIn, function(
  req,
  res,
  next
) {
  res.render('adminPanel');
});

router.get('/admin/admin-panel/new-admin', authController.isLoggedIn, function(
  req,
  res,
  next
) {
  res.render('newAdmin');
});

router.post(
  '/admin/admin-panel/new-admin/add',
  authController.isLoggedIn,
  settingsController.addAdmin
);

router.get(
  '/admin/blog-settings',
  authController.isLoggedIn,
  blogSettingsController.loadSettings
);
router.post(
  '/admin/blog-settings',
  authController.isLoggedIn,
  blogSettingsController.upload,
  catchErrors(blogSettingsController.resize),
  blogSettingsController.saveSettings
);

router.get(
  '/admin/account/edit',
  authController.isLoggedIn,
  adminController.renderEditAccount
);

router.post(
  '/admin/account/edit',
  authController.isLoggedIn,
  adminController.editAccount
);

// catch 404s for admin
router.get('/admin/*', authController.isLoggedIn, function(req, res) {
  res.status(404);
  res.render('adminNotFound', { title: '404 Not Found' });
});

// catch 404s for blog
router.get('/*', catchErrors(blogSettingsController.getSettings), function(
  req,
  res
) {
  res.status(404);
  res.render('notFound', { title: '404 Not Found', settings: req.settings });
});

module.exports = router;

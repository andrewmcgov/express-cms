const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const postController = require('../controllers/postController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', catchErrors(postController.loadIndex));

router.get('/about', function(req, res, next) {
  res.render('page', { title: 'About' });
});

router.get('/admin', authController.isLoggedIn, postController.loadAdmin);

router.get('/admin/new-post', postController.addPost);
router.post('/admin/new-post', catchErrors(postController.writePost));

router.get('/admin/posts/:slug/edit', catchErrors(postController.editPost));
router.post(
  '/admin/new-post/:slug/:id/edit',
  catchErrors(postController.updatePost)
);

router.get('/posts/:slug', catchErrors(postController.singlePost));

router.get('/admin/login', adminController.loginForm);

router.get('/admin/logout', authController.logout);

router.get('/admin/register', adminController.registerForm);

router.post(
  '/admin/register',
  adminController.validateAdmin,
  adminController.handleValidatedData,
  adminController.register,
  authController.login
);

router.post('/admin/login', authController.login);

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

module.exports = router;

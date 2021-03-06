const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const promisify = require('es6-promisify');
const { body, validationResult, check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.loginForm = (req, res) => {
  res.render('adminLogin', { title: 'login' });
};

exports.registerForm = (req, res) => {
  res.render('adminRegister', { title: 'register' });
};

exports.validateAdmin = [
  sanitizeBody('firstName').trim(),
  sanitizeBody('lastName').trim(),
  sanitizeBody('email').trim(),
  sanitizeBody('password').trim(),
  sanitizeBody('password-confirm').trim(),
  check('firstName', 'You must have a first name').isLength({ min: 1 }),
  check('lastName', 'You must have a last name').isLength({ min: 1 }),
  check('email', 'You must provide a valid email').isEmail(),
  check('password').isLength({ min: 1 }),
  check('password-confirm').isLength({ min: 1 }),
  check('password-confirm', 'Password and confirm password do not match')
    .exists()
    .custom((value, { req }) => value == req.body.password)
];

exports.handleValidatedData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array();
    req.flash('alert', errorMsg.map(err => err.msg));
    res.render('adminRegister', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const admin = new Admin({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  const register = promisify(Admin.register, Admin);
  await register(admin, req.body.password);
  next();
};

exports.renderEditAccount = (req, res) => {
  console.log(req.user);
  res.render('editAccount', { admin: req.user });
};

exports.editAccount = async (req, res) => {
  const admin = await Admin.findOneAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', 'Successfully updated your account');
  res.redirect('/admin/account/edit');
};

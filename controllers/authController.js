const passport = require('passport');
// crypto is a built in node module
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('Admin');
const promisify = require('es6-promisify');
const Admin = mongoose.model('Admin');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/admin/login',
  failureFlash: 'Login failed',
  successRedirect: '/admin',
  successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/admin');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('alert', 'Oops you must be logged in to do that!');
  res.redirect('/admin/login');
};

exports.forgotPassword = async (req, res) => {
  console.log('forgot password');
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    req.flash('alert', "Whoops, that wasn't what we were expecting");
    return res.redirect('/login');
  }
  admin.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await admin.save();

  const resetURL = `http://${req.headers.host}/admin/reset/${
    admin.resetPasswordToken
  }`;
  await mail.send({
    admin,
    filename: 'password-reset',
    subject: 'Express CMS password update',
    resetURL
  });
  req.flash('success', `You have been emailed a password link!`);
  res.redirect('/admin/login');
};

exports.resetPassword = async (req, res) => {
  console.log(req.params);
  const admin = await Admin.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!admin) {
    req.flash(
      'alert',
      'Password reset failed or link has expired - fails at reset'
    );
    return res.redirect('/login');
  }
  res.render('resetPassword', { title: 'Reset your password' });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  console.log('confirmed passwords passes');
  req.flash('alert', 'Passwords do not match!');
  res.redirect('back');
};

exports.update = async (req, res) => {
  const admin = await Admin.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!admin) {
    req.flash(
      'alert',
      'Password reset is invalid or has expired - fails at update'
    );
    return res.redirect('/login');
  }

  const setPassword = promisify(admin.setPassword, admin);
  await setPassword(req.body.password);
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpires = undefined;
  const updatedAdmin = await admin.save();
  //await req.login(updatedAdmin);
  req.login(updatedAdmin, err => {
    if (err) {
      req.flash('Something went wrong. Please try again');
      res.redirect('/admin/login');
      return;
    }
    req.flash('success', 'Password has been reset, you are now logged in');
    res.redirect('/admin/');
  });
};

const passport = require('passport');
// crypto is a built in node module
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('Admin');
const promisify = require('es6-promisify');
const Admin = mongoose.model('Admin');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Login failed',
  successRedirect: '/admin',
  successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
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
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    req.flash('alert', "Whoops, that wasn't what we were expecting");
    return res.redirect('/login');
  }
  admin.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await admin.save();

  const resetURL = `http://${req.headers.host}/account/reset/${
    admin.resetPasswordToken
  }`;
  // await MediaList.send({
  //   admin,
  //   filename: 'password-reset',
  //   subject: 'Express CMS password update',
  //   resetURL
  // });
  req.flash('success', `You have been emailed a password link: ${resetURL}`);
};

exports.resetPassword = async (req, res) => {
  const admin = await admin.find({
    resetPasswordtoke: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!admin) {
    req.flash('alert', 'Password reset failed or link has expired');
    return res.redirect('/login');
  }
  res.render('reset', { title: 'Reset your password' });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
  }
  req.flash('alert', 'Passwords do not match!');
  res.redirec('back');
};

exports.update = async (req, res) => {
  const admin = await Admin.findOne({
    resetPasswordtoken: req.params.token,
    resetPasswordExpires: { $gr: Date.now() }
  });

  if (!user) {
    req.flash('alert', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(admin.setPassword, admin);
  await setPassword(req.body.password);
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpires = undefined;
  const updatedAdmin = await admin.save();
  await requestAnimationFrame.login(updatedUser);
  req.flash('success', 'Password has been reset and you are logged in');
  res.redirect('/admin');
};

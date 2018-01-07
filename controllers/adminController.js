const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const promisify = require("es6-promisify");
const { check, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.loginForm = (req, res) => {
  res.render("login", { title: "login" });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "register" });
};

// the methods on the req come from: https://github.com/ctavan/express-validator
// these methods help us quickly validate our new user
exports.validateAdmin = (req, res, next) => {
  console.log(req.body);
  // check('name', 'You must have a name').isLength({ min: 1 });
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log('Logged errors: ', errors);
  //   res.send(errors);
  // }
  next();
};

exports.register = async (req, res, next) => {
  const admin = new Admin({
    // Passing the email in as the user name fixed out problem
    username: req.body.email,
    name: req.body.name,
    email: req.body.email
  });
  const register = promisify(Admin.register, Admin);
  await register(admin, req.body.password);
  res.send('it works!!!');
};

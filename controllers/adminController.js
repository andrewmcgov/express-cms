const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const promisify = require("es6-promisify");
const { check, checkBody } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.loginForm = (req, res) => {
  res.render("login", { title: "login" });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "register" });
};

// the methods on the req come from: https://github.com/ctavan/express-validator
// these methods help us quickly validate our new user
exports.registerAdmin = (req, res, next) => {
  console.log(req.body);
  //sanitizeBody("name");
  // req.sanitizeBody("name");
  // // See: https://github.com/ctavan/express-validator#usage
  // //req.body.check("email", "Please provide a name").isEmail();
  // req.check("name").notEmpty();
  //check("name", "Please provide your name").notEmpty();
  // req.checkBody("email", "Email provided is not valid").isEmail();
  // req.sanitizeBody("email").normalizeEmail({
  //   gmail_remove_dots: false,
  //   remove_extension: false,
  //   gmail_remove_subdomain: false
  // });
  // req.checkBody("password", "Password cannot be blank").notEmpty();
  // req
  //   .checkBody("password-confirm", "Please confirm your password")
  //   .notEmpty()
  //   .equals(req.body.password);
  // // See: https://github.com/ctavan/express-validator#reqvalidationerrorsmapped
  // const errors = req.validationErrors;
  // if (errors) {
  //   req.render(errors);
  // }
  // console.log("registerAdmin runs");
  next();
};

exports.register = async (req, res, next) => {
  const admin = new Admin({
    email: req.body.email,
    name: req.body.name,
    username: req.body.username
  });
  const register = promisify(Admin.register, Admin);
  await register(admin, req.body.password);
  // next();
  res.redirect("/admin");
};

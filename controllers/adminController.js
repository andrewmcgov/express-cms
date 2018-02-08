const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const promisify = require("es6-promisify");
const { body, validationResult, check } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.loginForm = (req, res) => {
  res.render("adminLogin", { title: "login" });
};

exports.registerForm = (req, res) => {
  res.render("adminRegister", { title: "register" });
};

// the methods on the req come from: https://github.com/ctavan/express-validator
// these methods help us quickly validate our new user
exports.validateAdmin = [
  check("name", "You must have a name").isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Logged errors: ", errors);
      res.send(errors);
    }
    next();
  }
];

exports.register = async (req, res, next) => {
  const admin = new Admin({ email: req.body.email, name: req.body.name, });
  const register = promisify(Admin.register, Admin);
  await register(admin, req.body.password);
  next();
};

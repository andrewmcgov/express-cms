const passport = require("passport");
// crypto is a built in node module
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = mongoose.model("Admin");
const promisify = require("es6-promisify");

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Login failed",
  successRedirect: "/admin",
  successFlash: "You are now logged in"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/");
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash("error", "Oops you must be logged in to do that!");
  res.redirect("/admin/login");
};

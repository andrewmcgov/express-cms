var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/about", function(req, res, next) {
  res.render("page", { title: "About" });
});

router.get("/admin", function(req, res, next) {
  res.render("adminHome", { title: "Welcome, Admin" });
});

router.get("/admin/new-post", postController.addPost);

router.post("/admin/new-post", postController.writePost);

module.exports = router;

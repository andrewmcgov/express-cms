const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");

const postController = require("../controllers/postController");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", catchErrors(postController.loadIndex));

router.get("/about", function(req, res, next) {
  res.render("page", { title: "About" });
});

router.get("/admin", postController.loadAdmin);

router.get("/admin/new-post", postController.addPost);

router.post("/admin/new-post", catchErrors(postController.writePost));

router.get("/posts/:slug", catchErrors(postController.singlePost));

router.get("/login", adminController.loginForm);

router.get("/register", adminController.registerForm);

router.post(
  "/register",
  // validate registration data
  adminController.validateAdmin,
  // register the user
  adminController.register
  // log the user in
  //authController.login
);

module.exports = router;

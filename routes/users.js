var express = require("express");
var router = express.Router();

const userSchema = require("../models/user.models");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(userSchema.authenticate()));

/* GET users listing. */
router.get("/signup", (req, res, next) => {
  res.render("signup", { user: req.user });
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  await userSchema.register({ username, email }, password);
  res.redirect("/user/signin");
});

router.get("/signin", (req, res, next) => {
  res.render("signin", { user: req.user });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
  }),
  (req, res, next) => {}
);

router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.user });
});

router.get("/change-password/:id", (req, res, next) => {
  res.render("change-password", { user: req.user });
});

router.post("/change-password/:id", async (req, res, next) => {
  try {
    await req.user.changePassword(req.body.oldpassword, req.body.newpassword);
    await req.user.save();
    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

router.get("/logout/:id", (req, res, next) => {
  req.logout(() => {
    res.redirect("/user/signup");
  });
});

router.get("/delete-account/:id", async (req, res, next) => {
  await userSchema.findByIdAndDelete(req.params.id);
  res.redirect("/user/signup");
});

router.get("/update-user/:id", (req, res, next) => {
  res.render("update-user", { user: req.user });
});

router.post("/update-user/:id", async (req, res, next) => {
  try {
    await userSchema.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/user/signin");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

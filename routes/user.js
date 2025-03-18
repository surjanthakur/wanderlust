const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../errors/wrapAsync");
const passport = require("passport");

//create account router
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.flash("success", "welcome to wanderlust");
    res.redirect("/listings");
  })
);

//login route
router.get("/login", (reqw, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    failureMessage: "Invalid Username or Password",
  }),
  wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  })
);

module.exports = router;

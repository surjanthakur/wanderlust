const User = require("../models/user");

module.exports.createAccount = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpRoute = async (req, res) => {
  let { username, email, password } = req.body;
  let newUser = new User({ username, email });
  const registerUser = await User.register(newUser, password);
  req.login(registerUser, (err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "welcome to wanderlust");
    res.redirect("/listings");
  });
};

module.exports.loginRoute = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogin = async (req, res) => {
  let redirect = res.locals.redirectUrl || "/listings";
  req.flash("success", "Welcome back!");
  res.redirect(redirect);
};

module.exports.logoutRoute = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("err", "user logout !");
    res.redirect("/listings");
  });
};

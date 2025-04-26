if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./errors/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const sessionOption = {
  secret: "mysecretkayofprojectairbnb",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 15 * 24 * 60 * 60 * 1000,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

const listings = require("./routes/listing");
const reviews = require("./routes/review");
const users = require("./routes/user");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("db is working");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//express session
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash message middlewarej
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.err = req.flash("err");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listings);
app.use("/listings", reviews);
app.use("/", users);

//invalide route middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found !"));
});

//error handling middleware
app.use((err, req, res, next) => {
  let { status = 404, message = "something went wrong !" } = err;
  res.render("error.ejs", { message });
});

// Start server
app.listen(8080, () => {
  console.log("App is listening on port 8080");
});

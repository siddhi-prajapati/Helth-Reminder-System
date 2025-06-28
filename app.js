// app.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./config/passport")(passport);

const app = express();

// Choose Mongo URI based on environment
const ENV = process.env.NODE_ENV || "development";
const MONGO_URI = ENV === "production" ? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI_LOCAL;

// DB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log(`MongoDB Connected: ${ENV}`))
  .catch(err => console.error("MongoDB connection error:", err));

// EJS Setup
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: process.env.SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI })
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Globals
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", require("./routes"));

// Only run server locally
if (ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export for Vercel
module.exports = app;

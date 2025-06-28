const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require('./config/passport')(passport);

const app = express();

// Determine environment and MongoDB URI
const ENV = process.env.NODE_ENV || "development";
const MONGO_URI = ENV === "production" ? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI_LOCAL;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log(`MongoDB Connected: ${ENV}`))
  .catch(err => console.error("MongoDB connection error:", err));

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Session
app.use(session({
  secret: process.env.SECRET || "secretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", require("./routes"));

// ✅ Localhost only
if (ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running locally at http://localhost:${PORT}`)
  );
}

// ✅ For Vercel
module.exports = app;

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

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/healthReminder");
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

// mongoose.connect("mongodb://127.0.0.1:27017/healthReminder", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
console.log("MongoDB Connected");

// EJS Setup
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/healthReminder" }),
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

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

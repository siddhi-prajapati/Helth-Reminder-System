const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./models/User");
const Reminder = require("./models/Reminder");
const { ensureAuthenticated } = require("./utils/auth");

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "Email already registered" });
      res.render("register", { errors, name, email, password, password2 });
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();
      req.flash("success_msg", "You are now registered. Please log in.");
      res.redirect("/login");
    }
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.id });
  res.render("dashboard", { reminders });
});

// Create Reminder
router.post("/reminders", ensureAuthenticated, async (req, res) => {
  const { title, description, time, repeat } = req.body;
  const newReminder = new Reminder({
    title,
    description,
    time,
    repeat,
    user: req.user.id,
  });
  await newReminder.save();
  req.flash("success_msg", "Reminder added");
  res.redirect("/dashboard");
});

// Delete Reminder
router.delete("/reminders/:id", ensureAuthenticated, async (req, res) => {
  await Reminder.deleteOne({ _id: req.params.id, user: req.user.id });
  req.flash("success_msg", "Reminder deleted");
  res.redirect("/dashboard");
});

module.exports = router;

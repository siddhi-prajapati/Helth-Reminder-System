const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  time: { type: String },
  repeat: { type: String }, // e.g. daily, weekly, monthly
});

module.exports = mongoose.model("Reminder", ReminderSchema);

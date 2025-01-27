const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Custom ObjectId field for id
  name: { type: String, required: true }, // Feedback provider's name
  feedback: { type: String, required: true }, // Feedback content
});

module.exports = mongoose.model("Feedback", feedbackSchema);

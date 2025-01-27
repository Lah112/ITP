const express = require("express");
const {
  getAllFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/FeedBackController"); 

const router = express.Router();

// GET all feedbacks
router.get("/", getAllFeedbacks);

// POST to create a new feedback
router.post("/create", createFeedback);

// PUT to update an existing feedback by its ID
router.put("/:id", updateFeedback);

// DELETE a feedback by its ID
router.delete("/:id", deleteFeedback);

module.exports = router;

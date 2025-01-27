const Feedback = require("../models/FeedBack");

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 }); // Get all feedbacks sorted by id
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error); // Log the error
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

// Create a new feedback
exports.createFeedback = async (req, res) => {
  const { id, name, feedback } = req.body;
  console.log(id, name, feedback); // Log the feedback details for debugging
  try {
    const newFeedback = new Feedback({
      id,
      name,
      feedback,
    });
    await newFeedback.save();
    res.status(201).json(newFeedback); // Send the created feedback as response
  } catch (error) {
    console.error("Error creating feedback:", error); // Log the error
    res.status(500).json({ message: "Error creating feedback", error });
  }
};

// Update a feedback by its ID
exports.updateFeedback = async (req, res) => {
  const { id } = req.params; // Get feedback id from request parameters
  const { name, feedback } = req.body; // Get the new data from request body
  console.log("Updating feedback with ID:", id); // Log the feedback id for debugging
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, feedback },
      { new: true } // Return the updated document
    );
    if (updatedFeedback) {
      res.status(200).json(updatedFeedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error("Error updating feedback:", error); // Log the error
    res.status(500).json({ message: "Error updating feedback", error });
  }
};

// Delete a feedback by its ID
exports.deleteFeedback = async (req, res) => {
  const { id } = req.params; // Get feedback id from request parameters
  console.log("Deleting feedback with ID:", id); // Log the feedback id for debugging
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id); // Find and delete the feedback
    if (deletedFeedback) {
      res
        .status(200)
        .json({ message: "Feedback deleted successfully", deletedFeedback });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error("Error deleting feedback:", error); // Log the error
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};

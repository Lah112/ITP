import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useSelector } from "react-redux";

const SimplePopup = ({
  opencreate,
  setopencreate,
  fetchFeedbacks,
  isUpdate,
  updateData,
  setisUpdate,
}) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const user = useSelector((state) => state.user);

  const [errorMessage, setErrorMessage] = useState(""); // To handle errors

  // Use useEffect to set initial values when in update mode
  useEffect(() => {
    if (isUpdate && updateData) {
      setName(updateData.name);
      setFeedback(updateData.feedback);
    } else {
      // If not in update mode, reset the fields
      setName("");
      setFeedback("");
    }
  }, [isUpdate, updateData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      name,
      feedback,
      id: user.id, // Replace with actual user ID if dynamic
    };

    try {
      if (isUpdate) {
        // If updating feedback, send PUT request
        await axios.put(
          `http://localhost:3005/api/feedback/${updateData._id}`,
          feedbackData
        );
        console.log("Feedback updated successfully");
        fetchFeedbacks(); // Fetch feedbacks again to update the list
        setisUpdate(false); // Reset update mode
      } else {
        // If creating new feedback, send POST request
        await axios.post(
          "http://localhost:3005/api/feedback/create",
          feedbackData
        );
        console.log("Feedback created successfully");
      }

      // Clear the form fields after submission
      setName("");
      setFeedback("");
      fetchFeedbacks(); // Fetch feedbacks again to update the list

      // Close popup after successful submission
      setopencreate(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div>
      {opencreate && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)", // Darken background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "16px", // Increased border radius for a modern look
              width: "450px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Added shadow for depth
              textAlign: "center",
              position: "relative",
              transform: "translateY(0)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: "#333",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              {isUpdate ? "Update Feedback" : "Add New Feedback"}
            </h2>

            {errorMessage && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#FF8C00")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                required
              />

              <textarea
                placeholder="Your Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  minHeight: "120px",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#FF8C00")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                required
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #FF8C00, #FF4500)", // Gradient button
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "transform 0.2s ease, background 0.3s ease",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {isUpdate ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setopencreate(false);
                    setisUpdate(false); // Reset update state when closing
                  }}
                  style={{
                    backgroundColor: "#ccc",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#bbb")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ccc")
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePopup;

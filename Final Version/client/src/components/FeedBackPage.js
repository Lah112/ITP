import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useSelector } from "react-redux";
import SimplePopup from "./SimplePopup";

const FeedBackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserId = "214122";
  const user = useSelector((state) => state.user);
  const [opencreate, setopencreate] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({});

  // Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/feedback/"); 
      setFeedbacks(response.data); 
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Fetch all feedbacks when the component is mounted
  useEffect(() => {
    fetchFeedbacks(); // Call the fetch function
  }, []);

  // Update filteredFeedbacks when feedbacks change
  useEffect(() => {
    setFilteredFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleAddNewClick = () => {
    setopencreate(true);
  };

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:3005/api/feedback/${feedbackId}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId)); 
      console.log("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleUpdate = (feedback) => {
    setisUpdate(true);
    setUpdateData(feedback);
    setopencreate(true);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFeedbacks(filtered);
    }
  };

  const handleClear = () => {
    setSearchQuery(""); 
    setFilteredFeedbacks(feedbacks); 
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <button
        onClick={handleAddNewClick}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "linear-gradient(90deg, #FF8C00, #FF4500)", // Gradient background
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"; 
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Add New Feedback
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "#4A4A4A",
          fontSize: "36px", // Larger font size
          fontWeight: "bold",
          letterSpacing: "2px", // Adding letter spacing
          textTransform: "uppercase", // Making it uppercase
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // Adding subtle shadow
          marginBottom: "40px",
        }}
      >
        FeedBack Board
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search feedbacks..."
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF8C00",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            marginRight: "10px", 
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#FF6500";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#FF8C00";
          }}
        >
          Search
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#999";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#ccc";
          }}
          disabled={searchQuery.trim() === ""}
        >
          Clear
        </button>
      </div>

      {/* Feedback List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {filteredFeedbacks.map((feedback) => (
          <div
            key={feedback._id}
            style={{
              borderRadius: "16px",
              padding: "24px",
              width: "300px",
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              textAlign: "center",
              cursor: "pointer",
              transform: "translateY(0)",
              borderLeft: "6px solid #FF8C00",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3 style={{ color: "#FF8C00", margin: "0 0 10px 0" }}>
              {feedback.name}
            </h3>
            <p
              style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}
            >
              {feedback.feedback}
            </p>

            {feedback.id === user.id && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => handleUpdate(feedback)}
                  style={{
                    backgroundColor: "#FF8C00",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    fontSize: "14px",
                    marginRight: "8px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6500";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8C00";
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(feedback._id)}
                  style={{
                    backgroundColor: "#FF4500",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    fontSize: "14px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF2400";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF4500";
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <SimplePopup
        opencreate={opencreate}
        setopencreate={setopencreate}
        fetchFeedbacks={fetchFeedbacks}
        isUpdate={isUpdate}
        updateData={updateData}
        setisUpdate={setisUpdate}
      />
    </div>
  );
};

export default FeedBackPage;

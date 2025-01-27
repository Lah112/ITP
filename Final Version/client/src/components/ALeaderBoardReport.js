import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

const ALeaderBoardReport = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const pageRef = useRef();

  useEffect(() => {
    // Fetch leaderboard data from the API for answers leaderboard
    axios
      .get("http://localhost:3005/api/posts/point/answers") // Adjust API endpoint for answers
      .then((response) => {
        // Sort the leaderboard by totalPoints in descending order
        const sortedData = response.data.sort(
          (a, b) => b.totalPoints - a.totalPoints // Assuming totalPoints is the correct field
        );
        setLeaderboard(sortedData); // Update leaderboard with sorted data
      })
      .catch((error) => {
        console.error("Error fetching answers leaderboard:", error);
      });
  }, []);

  const downloadPdf = () => {
    const element = pageRef.current;
    html2pdf().from(element).save();
  };

  return (
    <div>
      <div
        ref={pageRef}
        id="page-content"
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Answers LeaderBoard</h1>
        <table
          style={{
            width: "100%",
            maxWidth: "1000px", // Set max width
            margin: "0 auto",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Rank
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user._id}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {index + 1} {/* Rank based on sorted position */}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {user.username}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {user.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          style={{
            backgroundColor: "#FF5700",
            padding: "6px 8px",
            borderRadius: "12px",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
          onClick={downloadPdf}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ALeaderBoardReport;

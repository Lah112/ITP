import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionsLeaderBoard = ({ leaderboard, type }) => {
  console.log(leaderboard);
  return (
    <>
      {type === "q" ? (
        <div
          style={{
            width: "55%",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "24px",
            boxShadow: "0 10px 20px rgba(220, 220, 220, 0.3)",
            backgroundColor: "#fefefe",
            background: "linear-gradient(135deg, #ffffff, #f0f9ff)",
            border: "1px solid #e3e3e3",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 12px 24px rgba(200, 200, 200, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 10px 20px rgba(220, 220, 220, 0.3)";
          }}
        >
          {leaderboard
            .sort((a, b) => b.pointsCount - a.pointsCount)
            .map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 10px",
                  borderBottom: "1px solid #ececec",
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "#fefefe",
                  fontFamily: "Verdana, sans-serif",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0f7fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    i % 2 === 0 ? "#fafafa" : "#fefefe";
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    color: "#555",
                    fontSize: "16px",
                    letterSpacing: "0.6px",
                  }}
                >
                  {item.username}
                  {i === 0 && " 🏆"}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {i + 1}({item.pointsCount}pts)
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div
          style={{
            width: "55%",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "24px",
            boxShadow: "0 10px 20px rgba(220, 220, 220, 0.3)",
            backgroundColor: "#fefefe",
            background: "linear-gradient(135deg, #ffffff, #f0f9ff)",
            border: "1px solid #e3e3e3",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 12px 24px rgba(200, 200, 200, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 10px 20px rgba(220, 220, 220, 0.3)";
          }}
        >
          {leaderboard
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 10px",
                  borderBottom: "1px solid #ececec",
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "#fefefe",
                  fontFamily: "Verdana, sans-serif",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0f7fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    i % 2 === 0 ? "#fafafa" : "#fefefe";
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    color: "#555",
                    fontSize: "16px",
                    letterSpacing: "0.6px",
                  }}
                >
                  {item.username}
                  {i === 0 && " 🏆"}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {i + 1}({item.totalPoints} pts)
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default QuestionsLeaderBoard;

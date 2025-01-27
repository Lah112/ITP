import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const ReportPage = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      {/* Leader Board Section */}
      <div>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Leader Board Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/qleaderboard">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Question LeaderBoard
            </Button>
          </Link>
          <Link to="/aleaderboard">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#009688",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Answer LeaderBoard
            </Button>
          </Link>
        </div>
      </div>

      {/* Tag Report Section */}
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Tag Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/tagreport">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Tag Report
            </Button>
          </Link>
        </div>
      </div>

      {/* User Report Section */}
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Notification Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/notificationreport">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#ff9800",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Notification Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Topic Report Section */}
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Post Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/postreport">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Post Report
            </Button>
          </Link>
        </div>
      </div>





      {/* Posted Questions Report Section */}
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Posted Questions Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/posted-questions-report">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#2196F3", // Blue color for this button
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Posted Questions Report
            </Button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Article Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/articlereport">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Article Report
            </Button>
          </Link>
        </div>
      </div>
      
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          User Reports
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/userslist">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              User Reports
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ReportPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const NotificationReport = () => {
  const [notifications, setNotifications] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchSender, setSearchSender] = useState("");
  const [searchReceiver, setSearchReceiver] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user);

  const pageRef = useRef();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const fetchUsernameById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/users/name/${id}`
      );
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      return "Unknown";
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/notification/`);
      if (response.status === 200) {
        const notificationsData = response.data;
        setNotifications(notificationsData);

        const uniqueIds = [
          ...new Set([
            ...notificationsData.map((notification) => notification.senderId),
            ...notificationsData.map((notification) => notification.reciverId),
          ]),
        ];

        const fetchedUsernames = await Promise.all(
          uniqueIds.map(async (id) => {
            const username = await fetchUsernameById(id);
            return { id, username };
          })
        );

        const usernameMap = fetchedUsernames.reduce((acc, { id, username }) => {
          acc[id] = username;
          return acc;
        }, {});

        setUsernames(usernameMap);
        setFilteredNotifications(notificationsData);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const validateSearch = () => {
    const errors = {};
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      errors.dateRange = "End date cannot be earlier than the start date";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const filterNotifications = () => {
    if (!validateSearch()) {
      setFilteredNotifications([]); // Clear notifications if there's a validation error
      return;
    }

    const filtered = notifications.filter((notification) => {
      const senderUsername = usernames[notification.senderId] || "";
      const receiverUsername = usernames[notification.reciverId] || "";
      const notificationDate = new Date(notification.time);

      const isWithinDateRange =
        (!startDate || notificationDate >= new Date(startDate)) &&
        (!endDate || notificationDate <= new Date(endDate));

      return (
        senderUsername.toLowerCase().includes(searchSender.toLowerCase()) &&
        receiverUsername.toLowerCase().includes(searchReceiver.toLowerCase()) &&
        isWithinDateRange
      );
    });

    setFilteredNotifications(filtered);
  };

  useEffect(() => {
    filterNotifications();
  }, [searchSender, searchReceiver, startDate, endDate, usernames, notifications]);

  const downloadPdf = () => {
    const element = pageRef.current;
    html2pdf().from(element).save();
  };

  const clearFilters = () => {
    setSearchSender("");
    setSearchReceiver("");
    setStartDate("");
    setEndDate("");
    setErrors({});
    setFilteredNotifications(notifications);
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Notifications Search</h1>

        {/* Search Filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            />
            <input
              type="text"
              placeholder="Search by Sender Username"
              value={searchSender}
              onChange={(e) => setSearchSender(e.target.value)}
              style={{
                padding: "10px 40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "220px",
              }}
            />
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            />
            <input
              type="text"
              placeholder="Search by Receiver Username"
              value={searchReceiver}
              onChange={(e) => setSearchReceiver(e.target.value)}
              style={{
                padding: "10px 40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "220px",
              }}
            />
          </div>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={today}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            max={today}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.dateRange && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.dateRange}</div>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <button
            style={{
              backgroundColor: "#FF5700",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              color: "white",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div
          ref={pageRef}
          id="page-content"
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Notifications Report</h1> {/* Title for PDF */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Time</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Sender Username</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Receiver Username</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Is Read</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "8px", border: "1px solid black" }}>
                    No Data
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((notification) => (
                  <tr key={notification._id}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{notification.title}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{notification.description}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{new Date(notification.time).toLocaleString()}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{usernames[notification.senderId] || "Loading..."}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{usernames[notification.reciverId] || "Loading..."}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{notification.isRead ? "Yes" : "No"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={downloadPdf}
          style={{
            backgroundColor: "#FF5700",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default NotificationReport;

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@material-ui/core';
import { jsPDF } from "jspdf";
import { useDispatch, useSelector } from 'react-redux';
import backendUrl from '../backendUrl';
import axios from 'axios';
import userService from '../services/user';
import 'jspdf-autotable';
const UserReport = ({ userInfo, onClose }) => {
  const dispatch = useDispatch();
  const user1 = useSelector((state) => state.user);
  const baseUrl = `${backendUrl}/api/users`;

  useEffect(() => {
    console.log("user effect called");
    const fetchUserData = async () => {
      try {
        if (userInfo) { // Ensure userInfo has a username
          console.log("Fetching data for username:", userInfo);
          const userData = await userService.getUserData(userInfo); // Fetch user by username
          //const userData = response.data;

          dispatch({ type: 'SET_USER_DATA', payload: userData });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch, userInfo]);

  const {
    avatar,
    username: userName,
    email,
    createdAt,
    posts,
    totalComments,
    karma,
    role,
    birthyear,
    subscribedSubs,
  } = user1;

  let formattedCreatedAt;
  if (createdAt) {
    const date = new Date(createdAt);
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      formattedCreatedAt = date.toISOString();
    } else {
      formattedCreatedAt = "Invalid date"; // Fallback for invalid date
    }
  } else {
    formattedCreatedAt = "N/A"; // Fallback for undefined or null
  }

  const handleSaveToPDF = () => {
    const doc = new jsPDF();
    doc.text("User Report", 10, 10);

    const userDetails = [
      ["Username", userName || "N/A"],
      ["Email", email || "N/A"],
      ["Karma Points", karma || "N/A"],
      ["User Role", role || "N/A"],
      ["Post Count", posts?.length || "N/A"],
      ["Total Comments Count", totalComments || "N/A"],
      ["Subscribed Subs", subscribedSubs?.length || "N/A"],
      ["Created Date", formattedCreatedAt.split('T')[0] || "N/A"], // Get date part
      ["Created Time", formattedCreatedAt.split('T')[1] || "N/A"],
      ["Created Time", formattedCreatedAt.split('T')[1]?.split('.')[0] || "N/A"],
    ];

    doc.autoTable({
      head: [["Field", "Value"]], // Table header
      body: userDetails, // Table content
    });

    doc.save("user_report.pdf");
  };

  return (
    <Container>
      <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>User Report</DialogTitle>
        <DialogContent>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{userName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created Date</TableCell>
                  <TableCell>{formattedCreatedAt.split('T')[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created Time</TableCell>
                  <TableCell>{formattedCreatedAt.split('T')[1]?.split('.')[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Karma Points</TableCell>
                  <TableCell>{karma}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User Role</TableCell>
                  <TableCell>{role || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Post Count</TableCell>
                  <TableCell>{posts?.length || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Comments Count</TableCell>
                  <TableCell>{totalComments || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Subscribed Subs</TableCell>
                  <TableCell>{subscribedSubs?.length || 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveToPDF} color="primary">
            Save to PDF
          </Button>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserReport;
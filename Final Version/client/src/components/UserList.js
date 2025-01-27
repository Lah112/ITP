import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import UserReport from './UserReport';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [showReport, setShowReport] = useState(false); // State for showing UserReport
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [sortField, setSortField] = useState('username'); // State for sorting
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to open UserReport
  const handleViewReport = (user) => {
    setSelectedUser(user.username); // Set the selected user
    setShowReport(true); // Show the report dialog
  };

  // Function to close the UserReport dialog
  const handleCloseReport = () => {
    setShowReport(false);
    setSelectedUser(null); // Clear selected user when closing
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle sort field change
  const handleSortChange = (event) => {
    setSortField(event.target.value);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Function to filter and sort users
  const filteredUsers = users
  .filter(user => 
    (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
  )


  return (
    <Paper elevation={3} style={{
      padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf:"center",
    }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleViewReport(user)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* UserReport Dialog */}
      <Dialog open={showReport} onClose={handleCloseReport}>
        <DialogTitle>User Report</DialogTitle>
        <DialogContent>
          {selectedUser && <UserReport userInfo={selectedUser} onClose={handleCloseReport} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserList;
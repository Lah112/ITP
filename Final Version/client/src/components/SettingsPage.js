import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../reducers/userPageReducer';
import { notify } from '../reducers/notificationReducer';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';
import { AppBar, Tabs, Tab, TextField, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,Avatar, Switch, Divider, Paper, Typography,List, ListItem, ListItemText } from '@material-ui/core';
import { useUserPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import { logoutUser, setAvatar, updateUsername, updateUserRole } from '../reducers/userReducer';
import { useHistory } from 'react-router-dom';
import authService from '../services/auth';
import { MenuItem } from '@material-ui/core';
import userService from '../services/user';
import { getCircularAvatar, getSquareAvatar } from '../utils/cloudinaryTransform';
import UpdateAvatarModal from './UpdateAvatarModal';
import UpdateAvatarForm from './UpdateAvatarForm';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DescriptionIcon from '@material-ui/icons/Description';
import UserReport from './UserReport';
import axios from 'axios';


const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useUserPageStyles();
  const theme = useTheme();
  const { username } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userPage);
  const user = useSelector((state) => state.user);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  //const [showEmail, setShowEmail] = useState(user.showEmail);
  const useStyles = makeStyles((theme) => ({
    tab: {
      textAlign: 'right !important',
      justifyContent: 'flex-end !important',
      '& .MuiTab-wrapper': {
        alignItems: 'flex-end !important', // Ensures text and icon inside the tab are aligned to the right
      },
    },
    Paper: {
       padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative',

    },
    gradientLine:{
      position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px', // Height of the top border
            background: 'linear-gradient(90deg, rgba(42,42,42,0.2) 0%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.2) 100%)',
    },

  }));

  const classes1 = useStyles();

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(fetchUser(username));
        setPageLoading(false);
      } catch (err) {
        setPageError(getErrorMsg(err));
      }
    };
    getUser();
  }, [username, dispatch]);

  if (pageError) {
    return (
      <Container disableGutters>
        <ErrorPage errorMsg={pageError} />
      </Container>
    );
  }

  if (pageLoading) {
    return (
      <Container disableGutters>
        <LoadingSpinner text="Fetching user data..." />
      </Container>
    );
  }

  const {
    avatar,
    username: userName,
    email,
    createdAt,
    posts,
    totalComments,
    karmaPoints,
    role,
    birthyear,
  } = userInfo.userDetails;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //const { avatar, username: userName } = userInfo.userDetails;

  const handleChangeAvatarClick = () => {
    setIsAvatarModalOpen(true); // Open the avatar modal
  };

  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false); // Close the avatar modal
  };

  return (
    <Container style={{ display: 'flex', marginTop: '20px' }}>
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        style={{ borderRight: '1px solid #ccc', minWidth: '150px' }} // Border to separate the tabs from content
      >
        <Tab 
          label="All" 
          className={classes1.tab}
        />
        <Tab 
          label="Profile" 
          className={classes1.tab}
        />
        <Tab 
          label="Preferences" 
          className={classes1.tab}
          />
        <Tab 
          label="Critical Actions"
          className={classes1.tab}
         />

        {role === 'admin' && ( 
          <Tab 
            label="Mods Settings"
            className={classes1.tab}
          />
          
        )}
        {role === 'admin' && ( 
          <Tab 
            label="Notices"
            className={classes1.tab}
          />
          
        )}

      </Tabs>

      {/* Right side content */}
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <TextField
          variant="outlined"
          placeholder="Search settings..."
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
        <AllSettings searchTerm={searchTerm}
            userName={userName}
            user={user}
            avatar={avatar}
            handleChangeAvatarClick={handleChangeAvatarClick}
            classes={classes}
            classes1={classes1} 
            role={role}
            showEmail={true}  />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ProfileTab
            searchTerm={searchTerm}
            userName={userName}
            user={user}
            avatar={avatar}
            classes={classes}
            handleChangeAvatarClick={handleChangeAvatarClick}
            showEmail={true}
            classes1={classes1}
            userInfo={userInfo}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <PreferencesTab searchTerm={searchTerm} classes1={classes1}/>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <CriticalActionsTab searchTerm={searchTerm} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>       
          <ModsSettingsTab searchTerm={searchTerm} />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>       
          <NoticesTab searchTerm={searchTerm} />
        </TabPanel>
      </div>

      {/* Avatar Modal */}
      <Dialog open={isAvatarModalOpen} onClose={handleCloseAvatarModal}>
        <DialogTitle>Update Avatar</DialogTitle>
        <DialogContent>
          <UpdateAvatarForm closeModal={handleCloseAvatarModal} /> {/* Avatar form inside the modal */}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const ProfileTab = ({ searchTerm, userName, user, avatar,classes, handleChangeAvatarClick,showEmail, classes1, bYear, userInfo }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user1 = useSelector((state) => state.user);
  const [newUsername, setNewUsername] = useState(user.username);
  const [birthyear, setNewbirthyear] = useState(user.birthyear);
  const [currentPassword, setCurrentPassword] = useState('');
  const [openPasswordPrompt, setOpenPasswordPrompt] = useState(false); // Modal state
  const [showReport, setShowReport] = useState(false);
  


  const handleViewReport = () => {
    setShowReport(true);
  };

  // Function to handle closing the report (passed down to UserReport)
  const handleCloseReport = () => {
    setShowReport(false);
  };
  
  const handleAddyear = async () => {
    try {
      //const loginResponse = await authService.login(user1.username, currentPassword);
      
      await userService.updatebirthyear(user1.id,birthyear);
      
      
    } catch (error) {
      notify('Error updating birthyear: ' + error.message);
    } 
  };

  const handleSaveChanges = async () => {
    try {
      //const loginResponse = await authService.login(user1.username, currentPassword);
      
      await dispatch(updateUsername(user1.id, newUsername,user1.email , currentPassword));
      history.push(`/settings/${newUsername}`);
      
    } catch (error) {
      notify('Error updating username: ' + error.message);
    } finally {
      setOpenPasswordPrompt(false); // Close the modal after attempting to save changes
    }
  };
  const handleChangeAvatar = async () => {
      //change or add avatar logic to - do
    try {
      
      //

    } catch (error) {
      
    }

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} className= {classes1.Paper} fullWidth >
        <div 
          className={classes1.gradientLine}
        />
      <div className={classes.avatarWrapper}>
            {avatar && avatar.exists ? (
              <Avatar
                alt={userName}
                src={getSquareAvatar(avatar.imageLink)}
                className={classes.avatar}
                style={{borderRadius: 8}}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#941a1c' }}
                className={classes.avatar}
              >
                <h1>{userName[0]}</h1>
              </Avatar>
            )}
            <br></br>
            <Button variant="contained" color="primary" onClick={handleChangeAvatarClick}>
              Change Avatar
            </Button>
           
            <br></br>
            <br></br>
      </div>
      </Paper>
      
      <Paper elevation={3} className= {classes1.Paper} fullWidth >
        <div 
          className={classes1.gradientLine}
        />
        <TextField
          label="Add Birth Year"
        
          value={birthyear}
          onChange={(e) => setNewbirthyear(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddyear}>
          Add birthyear
        </Button>
      </Paper>

      <Paper elevation={3} className= {classes1.Paper} fullWidth >
        <div 
          className={classes1.gradientLine}
        />
        <TextField
          label="Edit Username"
          placeholder={userName}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={() => setOpenPasswordPrompt(true)}>
          Save Changes
        </Button>
      </Paper>

      <Paper elevation={3} className= {classes1.Paper} fullWidth >
        <div 
          className={classes1.gradientLine}
        />
        <label style={{ alignItems: 'left' }}> 
          Show Email:                              
        </label>
        <Switch
          style={{ marginLeft: '10px' }} 
          checked={showEmail} 
          //onChange={() => setShowEmail((prev) => !prev)} 
          color="primary" 
        />
      </Paper>
      <Button variant="contained" color="primary" onClick={handleViewReport}>
        View User Report
      </Button>

      {/* Render the UserReport component if showReport is true */}
      {showReport && (

        <UserReport userInfo={userName} onClose={handleCloseReport} />
      )}

      <Dialog open={openPasswordPrompt} onClose={() => setOpenPasswordPrompt(false)}>
        <DialogTitle>Confirm Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordPrompt(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PreferencesTab = (searchTerm, classes1) => (
  <div style={{ display: 'flex', flexDirection: 'column',}}>
    <Paper elevation={3} style={{
       padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative',

    }} fullWidth>
      <div style={{
      position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px', // Height of the top border
            background: 'linear-gradient(90deg, rgba(42,42,42,0.2) 0%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.2) 100%)',
    }} />
      <label style={{ alignItems: 'left' }}> 
        Enable Notifications:                              
      </label>
      <Switch
        style={{ marginLeft: '10px' }} 
        checked={true} // Replace with your state for notifications
        // onChange={() => setNotifications((prev) => !prev)} 
        color="primary" 
      />
    </Paper>

    <Paper elevation={3} style={{
       padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative',

    }} fullWidth>
      <div style={{
      position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px', // Height of the top border
            background: 'linear-gradient(90deg, rgba(42,42,42,0.2) 0%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.2) 100%)',
    }} />
      <label style={{ alignItems: 'left' }}> 
        Enable Dark Mode:                                                                 
      </label>
      <Switch
        style={{ marginLeft: '10px', alignItems: 'flex-end !important' }} 
        checked={true} // Replace with your state for dark mode
        // onChange={() => setDarkMode((prev) => !prev)} 
        color="primary" 
      />
    </Paper>
    <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
      Save Preferences
    </Button>
  </div>
);

const CriticalActionsTab = ({ user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const user1 = useSelector((state) => state.user);
  const [email, setemail] = useState('');

  const handleDeleteUser = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
    if (!confirmed) return;

    try {

      const credentials = {
        email: user1.email,
        password: password, 
      };

      console.log(credentials);

      
      await authService.login(credentials);

    
      await userService.deleteUser(user1.id);
      dispatch(notify("User deleted successfully."));
      
      
      //authService.logout();
      await dispatch(logoutUser());
      window.location.href = '/';  // Redirect to home after account deletion
    } catch (error) {

      console.log(error);
      dispatch(notify("Error: " + error.message));
    } finally {
      setOpen(false);  // Close the modal after attempting to delete
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}  // Open the password modal
        style={{ marginTop: '10px' }}
      >
        Delete Account
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => (console.log('its empty he he'))}  // Open the password modal
        style={{ marginTop: '10px' }}
      >
        Delete All Posts
      </Button>

      {/* Password Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Password to Confirm"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ModsSettingsTab = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("update role of "+email+" to "+role);
      await dispatch(updateUserRole(email, role)); // Call to the backend (ensure this function is imported)
      //dispatch(notify('User role updated successfully!'));
      dispatch(notify('User role updated'));
    } catch (error) {
      dispatch(notify('Error updating user role.'));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

    <Paper elevation={3} style={{
       padding: '20px', marginBottom: '10px', justifyContent: 'space-between', alignItems: 'center', position: 'relative',

    }} fullWidth>
      <div style={{
      position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px', // Height of the top border
            background: 'linear-gradient(90deg, rgba(42,42,42,0.2) 0%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.2) 100%)',
    }} />

      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative' }} fullWidth>
        <TextField
          label="Enter User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '20px', position: 'relative' }}
          fullWidth
        />
        <TextField
          select
          label="Select Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px', maxWidth:'150px' }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </TextField>
        <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        style={{align: 'right' }}
        
        
        >
          Add Role
        </Button>
      </form>
      </Paper>
      <Link to="/report">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            //className={classes.createSubBtn}
            size="large"
            startIcon={<DescriptionIcon />}
          >
            Reports
          </Button>
        </Link>
    </div>
  );
};

const NoticesTab = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Function to handle the submission of a new notice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Title validation: Only letters, no whitespace
    const titleValid = /^[A-Za-z]+$/.test(title);
    if (!titleValid) {
      setError('Title must contain only letters and cannot be empty or whitespace.');
      return;
    }

    // Content validation: Cannot be only whitespace
    if (!content.trim()) {
      setError('Content cannot be empty or whitespace.');
      return;
    }

    try {
      await axios.post('http://localhost:3005/api/notification/createNotice', {
        title,
        description: content, // Use description as content
        senderId: 'yourSenderId', // Replace with actual sender ID
        receiverId: 'yourReceiverId', // Replace with actual receiver ID
      });
      setTitle(''); // Clear title input
      setContent(''); // Clear content input
      fetchAllNotices(); // Refresh the notices list
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Set error message
    }
  };

  // Function to fetch all notices
  const fetchAllNotices = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/notification/get/AllNotices'); // Adjust the base URL if needed
      const populatedNotices = await Promise.all(
        response.data.map(async (notice) => {
          const usernameResponse = await axios.get(`http://localhost:3005/api/users/name/${notice.reciverId}`);
          return {
            ...notice,
            receiverUsername: usernameResponse.data.username, // Add receiver username to notice
          };
        })
      );
      setNotices(populatedNotices); // Update notices state
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Set error message
    }
  };

  // Function to handle editing a notice
  const handleEdit = (id, currentDescription) => {
    setEditId(id);
    setEditContent(currentDescription); // Pre-fill the edit content with current description
  };

  // Function to submit the edited notice
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Content validation: Cannot be only whitespace
    if (!editContent.trim()) {
      setError('Content cannot be empty or whitespace.');
      return;
    }

    try {
      await axios.put(`http://localhost:3005/api/notification/updateNotice/${id}`, {
        description: editContent, // Send updated description
      });
      setEditId(null); // Reset edit notice ID
      setEditContent(''); // Clear edit content
      fetchAllNotices(); // Refresh the notices list
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Set error message
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchAllNotices();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6">Send Notice</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notice Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Notice
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>All Notices</Typography>
      <List>
        {notices.length === 0 ? ( // Check if there are no notices
          <ListItem>
            <ListItemText primary="No Notices" />
          </ListItem>
        ) : (
          notices.map((notice) => (
            <ListItem key={notice._id}>
              <ListItemText 
                primary={notice.title} 
                secondary={`${notice.description} (Receiver: ${notice.receiverUsername})`} 
              />
              <Button onClick={() => handleEdit(notice._id, notice.description)}>Edit</Button>
            </ListItem>
          ))
        )}
      </List>
      {editId && (
        <form onSubmit={(e) => handleUpdate(e, editId)}>
          <TextField
            label="Edit Notice Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Notice
          </Button>
          <Button onClick={() => setEditId(null)}>Cancel</Button>
        </form>
      )}
    </Paper>
  );
};
const AllSettings = ({ searchTerm, userName, user, avatar, handleChangeAvatarClick, classes, classes1, role }) => {
  // Define all settings with additional searchable properties
  const allSettings = [
    {
      label: 'show email, avatar, change avatar, edit username, edit name',
      placeholder: 'Edit Username',
      buttonName: 'Save Changes change avatar',
      component: <ProfileTab {...{ searchTerm, userName, user, avatar, handleChangeAvatarClick, classes, classes1 }} />,
    },
    {
      label: 'Preferences',
      placeholder: 'Select your preferences',
      buttonName: 'Apply Preferences',
      component: <PreferencesTab classes1={classes1}/>,
    },
    {
      label: 'Critical Actions',
      placeholder: 'Perform critical actions',
      buttonName: 'Delete Account',
      component: <CriticalActionsTab user={user} />,
    },
    role === 'admin' &&{
      label: 'Mods Settings',
      placeholder: 'Manage moderator settings',
      buttonName: 'Add Role',
      component: <ModsSettingsTab />,
    },
    role === 'admin' &&{
      label: 'Notices',
      placeholder: 'Manage Notices',
      buttonName: 'Add Role',
      component: <NoticesTab />,
    },
  ];

  // Filter settings based on the search term across multiple properties
  const searchTermWords = searchTerm.toLowerCase().split(' '); // Split search term into words

const filteredSettings = allSettings.filter(setting => {
  const label = setting.label ? setting.label.toLowerCase() : '';
  const labels = label.split(',').map(keyword => keyword.trim());
  const matchesLabel = searchTermWords.every(word => 
    labels.some(label => label.includes(word))
  );

  const matchesPlaceholder = setting.placeholder && 
    searchTermWords.every(word => setting.placeholder.toLowerCase().includes(word));

  const matchesButtonName = setting.buttonName && 
    searchTermWords.every(word => setting.buttonName.toLowerCase().includes(word));

  return matchesLabel || matchesPlaceholder || matchesButtonName;
});

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {filteredSettings.length > 0 ? (
        filteredSettings.map((setting, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            {setting.component}
            {index < filteredSettings.length - 1 && <Divider style={{ margin: '50px 0', height: '4px' }} />}
          </div>
        ))
      ) : (
        <p>No settings found</p>
      )}
    </div>
  );
};

export default SettingsPage;
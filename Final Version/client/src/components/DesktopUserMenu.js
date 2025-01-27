import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';
import SubFormModal from './SubFormModal';
import UpdateAvatarModal from './UpdateAvatarModal';
import DarkModeMenuItem from './DarkModeMenuItem';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import storageService from '../utils/localStorage';
import NotificationPanel from './NotificationPanal';

import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
  Divider,
  Badge,
  
} from '@material-ui/core';
import { useUserMenuStyles } from '../styles/muiStyles';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from 'react-router-dom';

const DesktopUserMenu = ({ user, handleLogout }) => {
  const classes = useUserMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0); // Move notificationCount here
  const [panelOpen, setPanelOpen] = useState(false);
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
    history.push('/');
  };

  const handlePanelToggle = () => {
    setPanelOpen((prevState) => !prevState);
  };

  const loggedUser = storageService.loadUser() || user;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        minWidth: "25%",
        margin: "20px",
      }}
    >
      <NotificationPanel
          user={loggedUser}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
          setpanelOpen={panelOpen}
        />

      <Button
        style={{ justifyContent:"space-around", marginLeft:"20px" }}
        color="primary"
        
        //onClick={handleClickOpen}
        
        className={classes.createSubBtn}
        size="small"
        startIcon={<AddCircleIcon />}
      >
        Create New
      </Button>

      <Badge badgeContent={notificationCount} color="error"
       style={{ margin:"20px" }}
       
      >
        <NotificationsActiveIcon
          style={{ cursor: 'pointer', alignContent:"center",justifyContent:"center" }}
          onClick={handlePanelToggle} // Trigger the notification panel toggle
        />
      </Badge>

      {panelOpen && (
        <NotificationPanel
          user={loggedUser}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
          setpanelOpen={panelOpen}
        />
      )}

      {loggedUser ? (
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            {loggedUser?.avatar?.exists ? (
              <Avatar
                alt={loggedUser.username}
                src={getCircularAvatar(loggedUser.avatar.imageLink)}
                variant="rounded"
                className={classes.avatar}
              />
            ) : (
              <Avatar variant="rounded" className={classes.avatar}>
                {loggedUser.username[0]}
              </Avatar>
            )}
            <div>
              <Typography color="secondary">{loggedUser.username}</Typography>
              <Typography variant="caption" className={classes.karmaWrapper}>
                <FilterVintageIcon
                  fontSize="inherit"
                  style={{ marginRight: '0.2em' }}
                  color="secondary"
                />
                {loggedUser.karma} logged in
              </Typography>
            </div>
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >

            <MenuItem
              component={RouterLink}
              to={`/settings/${loggedUser.username}`} 
              onClick={handleClose}
            >
              <ListItemIcon>
                <SettingsIcon style={{ marginRight: 7 }} /> Settings
              </ListItemIcon>
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to={`/u/${loggedUser.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <SubFormModal type="menu" handleCloseMenu={handleClose} />
            <UpdateAvatarModal
              handleCloseMenu={handleClose}
              user={loggedUser}
            />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthFormModal />
          <DarkModeMenuItem closeMenu={handleClose} navItem={true} />
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;

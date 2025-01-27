import React, { useState, useEffect } from 'react';
import { ClickAwayListener, IconButton, Button } from '@material-ui/core';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

const NotificationPanel = ({ user, notificationCount, setNotificationCount, setpanelOpen }) => {
  const [panelOpen, setPanelOpen] = useState(setpanelOpen);
  const [notifications, setNotifications] = useState([]);
  //setPanelOpen(setpanelOpen);
  
  const fetchNotifications = async () => {
    if (user && user.id) {
      try {
        
        const response = await axios.get(`http://localhost:3005/api/notification/${user.id}`);
        if (response.status === 200) {
          setNotifications(response.data);
          setNotificationCount(response.data.filter(notification => !notification.isRead).length);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handlePanelToggle = () => {
    //setPanelOpen(!panelOpen);
  };

  const handleClickAway = () => {
    setPanelOpen(false);
    
  };

  const handleRemoveNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/notification/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleToggleReadStatus = async (id) => {
    try {
      await axios.put(`http://localhost:3005/api/notification/markAsRead/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error('Error toggling notification read status:', error);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div style={{ position: 'relative' }}>
      
        {panelOpen && (
          <div
            style={{
              position: 'absolute',
              background: '#fff',
              width: '20rem',
              maxHeight: '35rem',  // Set max height to enable scrolling
              overflowY: 'auto',  // Enable vertical scrolling
              top: '2.5rem',
              right: 0,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              padding: '1rem',
              zIndex: 1000,
            }}
          >
            <h4>Notifications</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification._id}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #ddd',
                      opacity: notification.isRead ? 0.5 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{notification.title}</strong>
                        <p
                          style={{
                            margin: '0.25rem 0',
                            fontSize: '0.85rem',
                            color: '#555',
                          }}
                        >
                          {notification.description}
                        </p>
                        <small style={{ color: '#999' }}>
                          {new Date(notification.time).toLocaleString()}
                        </small>
                      </div>
                      <div>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveNotification(notification._id)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        style={{ fontSize: '0.75rem', padding: 0, textTransform: 'none' }}
                        color="primary"
                        onClick={() => handleToggleReadStatus(notification._id)}
                      >
                        {notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No new notifications</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default NotificationPanel;
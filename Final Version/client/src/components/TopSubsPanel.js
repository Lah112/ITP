import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSubscribe } from '../reducers/subReducer';
import { notify } from '../reducers/notificationReducer';
import SubFormModal from './SubFormModal';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';
import storageService from '../utils/localStorage';

import {
  Paper,
  Typography,
  useMediaQuery,
  Link,
  Button,
  Zoom,
  Divider,
} from '@material-ui/core';
import { useSubPanelStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

// Replace with your image paths
import backgroundImage from '../assets/background.jpg'; // Background image
import headerImage from '../assets/header-image.png'; // Image above the panel

const TopSubsPanel = () => {
  const { subs, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('md'));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = storageService.loadUser() || user;
  const loadingSubs = !subs || !subs.topSubs;

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy;

      if (subscribedBy.includes(user.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = subscribedBy.includes(user.id)
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch(notify(message, 'success'));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <Zoom in>
      <Paper
        elevation={4}
        variant="outlined"
        className={classes.mainPaper}
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          width: '25%', // Set width to 25% of the entire screen
          height: 'auto', // Allow height to adjust based on content
          //margin: '20px auto', // Center the panel horizontally
          overflow: 'hidden', // Prevent overflow of content
        }}
      >
        {/* Image above the panel */}
        <img
          src={headerImage}
          alt="Header"
          style={{
            width: '90%', // Make the header image responsive
            height: 'auto', // Maintain aspect ratio
            borderRadius: '10px',
            marginBottom: '10px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />

        <Paper
          variant="outlined"
          className={classes.listPaper}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Increased transparency for better background display
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Added more depth to shadow
          }}
        >
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#2e3b55',
            }}
          >
            Top Subscribers
          </Typography>
          <Divider />
          {loadingSubs ? (
            <LoadingSpinner text="Fetching subs data..." />
          ) : (
            subs.topSubs.map((s, i) => (
              <div key={s.id} className={classes.listWrapper} style={{ padding: '10px 0' }}>
                <Typography
                  variant="body1"
                  className={classes.listItem}
                  style={{
                    fontSize: '1rem', // Adjusted font size for better readability
                    color: '#3a3a3a',
                  }}
                >
                  {`${i + 1}. `}
                  <Link
                    component={RouterLink}
                    to={`/r/${s.subredditName}`}
                    color="primary"
                    style={{
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#007aff')}
                    onMouseLeave={(e) => (e.target.style.color = 'inherit')}
                  >
                    r/{s.subredditName}
                  </Link>
                  {` - ${s.subscriberCount} members`}
                </Typography>
                {loggedUser && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={isSubscribed(s.subscribedBy, user) ? <CheckIcon /> : <AddIcon />}
                    onClick={() => handleJoinSub(s.id, s.subscribedBy, s.subredditName)}
                    style={{
                      marginLeft: '15px',
                      textTransform: 'none',
                      borderRadius: '25px',
                      backgroundColor: isSubscribed(s.subscribedBy, user) ? '#4caf50' : '#2196f3',
                      color: '#fff',
                      padding: '8px 16px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {isSubscribed(s.subscribedBy, user) ? 'Joined' : 'Join'}
                  </Button>
                )}
              </div>
            ))
          )}
        </Paper>
        {loggedUser && <SubFormModal />}
      </Paper>
    </Zoom>
  );
};

export default TopSubsPanel;

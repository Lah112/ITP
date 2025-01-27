import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer';
import { notify } from '../reducers/notificationReducer';
import MobileUserMenu from './MobileUserMenu';
import DesktopUserMenu from './DesktopUserMenu';
import SearchBar from './SearchBar';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// import { Link } from 'react-router-dom';


import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

// Import your custom logo
import CustomLogo from '../assets/logo.png';  // Adjust the path as needed
import NotificationPanal from './NotificationPanal';

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();
  const location = useLocation();  
  //const isSettingsPage = location.pathname === '/settings/${user.username}';
  const isSettingsPage = location.pathname.includes('/settings');
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(notify(`u/${user.username} logged out`, 'success'));
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1} style={{ marginBottom: '20px' }}> {/* Add margin here */}
      <Toolbar disableGutters={isMobile}>
        {!searchOpen && (
          <>
            <div className={classes.leftPortion}>
              <div className={classes.logoWrapper}
              style={{ 
                display:"grid",
                alignItems:"center",
                textAlign:"center",
                width:"25%"  // Adjust the value to make the corners more or less rounded
              }}
              
              >
                <Button
                  style={{ 
                    width: '150px', 
                    height: '100px', 
                    borderRadius: '15px',
                    margin:"20px"  // Adjust the value to make the corners more or less rounded
                  }}
                  className={classes.logo}
                  color="primary"
                  component={RouterLink}
                  to="/"
                  startIcon={
                    <img
                      src={CustomLogo}
                      alt="Logo"
                      style={{ 
                        width: '150px', 
                        height: '100px', 
                        borderRadius: '15px'  // Adjust the value to make the corners more or less rounded
                      }}  
                    />
                  }
                  size="large"
                >
                  
                </Button>
                
                
                
                 
                <Typography 
                  variant="caption" 
                  color="secondary" 
                  style={{ 
                    display:"flex",
                    width:"100%",
                    textAlign:"center"  // Adjust the value to make the corners more or less rounded
                  }}
                
                >

                  
                  Ideal Chemistry | Bandarawela
                  <Link
                    href={'.'}
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                  </Link>
                </Typography>
                
              </div>
              {!isMobile && !isSettingsPage && <SearchBar />}
            </div>
            {/* <Link to="/leaderboard" ><Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<TrendingUpIcon/>}
        >
          
        </Button></Link> */}
             {/* <Link
                    href={"/leaderboard"}
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >hello
                  </Link> */}
            
            {isMobile ? (
              <>
                {!isSettingsPage &&(
                  <IconButton
                    color="primary"
                    className={classes.searchBtn}
                    onClick={() => setSearchOpen((prevState) => !prevState)}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
                <MobileUserMenu user={user} handleLogout={handleLogout} />
              </>
            ) : (
              <>
              {user && 
                <NotificationPanal user={user}/>
              }
              
              <DesktopUserMenu user={user} handleLogout={handleLogout} />
              </>
            )}
          </>
        )}
        {searchOpen && isMobile && (
          <SearchBar isMobile={true} setSearchOpen={setSearchOpen} />
        )}
        
      </Toolbar>
      
    </AppBar>
  );
};

export default NavBar;

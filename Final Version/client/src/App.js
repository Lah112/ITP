import React, { useEffect } from 'react'; // Keep this import
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { fetchPosts } from './reducers/postReducer';
import { setSubList, setTopSubsList } from './reducers/subReducer';
import { setDarkMode } from './reducers/themeReducer';
import { notify } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import ToastNotif from './components/ToastNotif';
import Routes from './Routes';
import getErrorMsg from './utils/getErrorMsg';

import PostedQuestionsReport from './components/PostedQuestionsReport'; // Keep this import
import { Paper } from '@material-ui/core/';
import customTheme from './styles/customTheme';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useMainPaperStyles();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state);

  useEffect(() => {
    const setPostsAndSubreddits = async () => {
      try {
        await dispatch(fetchPosts('hot'));
        await dispatch(setSubList());
        await dispatch(setTopSubsList());
      } catch (err) {
        dispatch(notify(getErrorMsg(err), 'error'));
      }
    };

    dispatch(setUser());
    dispatch(setDarkMode());
    setPostsAndSubreddits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <Paper className={classes.root} elevation={0}>
        <ToastNotif />
        <NavBar />
        <Routes />
        {/* Include the PostedQuestionsReport component here if desired */}
        {/* Uncomment the next line to always show the report */}
        {/* <PostedQuestionsReport /> */}
      </Paper>
    </ThemeProvider>
  );
};

export default App;

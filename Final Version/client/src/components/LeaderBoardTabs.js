import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import QuestionsLeaderBoard from "./QuestionsLeaderBoard";
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LeaderBoardTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [leaderboard_q, setLeaderboard_q] = useState([]);
  const [leaderboard_a, setLeaderboard_a] = useState([]);
  const fetchQuestionLeaderBoard = () => {
    axios.get("http://localhost:3005/api/posts/point/questions")
      .then((response) => {
        setLeaderboard_q(response.data); // Update leaderboard with fetched data
      })
      .catch((error) => {
        setError(error.message); // Handle error
      });
  };

  const fetchAnswersLeaderBoard = () => {
    axios.get("http://localhost:3005/api/posts/point/answers")
      .then((response) => {
        console.log(response.data);
        setLeaderboard_a(response.data); // Update leaderboard with fetched data
      })
      .catch((error) => {
        setError(error.message); // Handle error
      });
  };
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch data from API
    fetchQuestionLeaderBoard();
    fetchAnswersLeaderBoard();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Questions LeaderBoard" {...a11yProps(0)} />
          <Tab label="Answers LeaderBoard" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <QuestionsLeaderBoard leaderboard={leaderboard_q} type="q" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QuestionsLeaderBoard leaderboard={leaderboard_a} type="a" />
      </TabPanel>
    </div>
  );
}

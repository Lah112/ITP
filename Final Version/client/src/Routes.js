import React from "react";
import { Switch, Route } from "react-router-dom";
import PostFormModal from "./components/PostFormModal";
import PostList from "./components/PostList";
import PostCommentsPage from "./components/PostCommentsPage";
import UserPage from "./components/UserPage";
import SubPage from "./components/SubPage";
import TopSubsPanel from "./components/TopSubsPanel";
import SearchResults from "./components/SearchResults";
import TagBasedSearchResults from "./components/TagBasedSearchResults"; // Import the new component
import NotFoundPage from "./components/NotFoundPage";
import TagReport from "./components/TagReport";
import SettingsPage from './components/SettingsPage';
import PostReport from "./components/PostReport";
import { Container } from "@material-ui/core/";
import { useMainPaperStyles } from "./styles/muiStyles";
import LeaderBoard from "./components/LeaderBoard";
import ReportPage from "./components/ReportPage";
import QLeaderBoardReport from "./components/QLeaderBoardReport";
import ALeaderBoardReport from "./components/ALeaderBoardReport";
import NotificationReport from "./components/NotificationReport";
import FeedBackPage from "./components/FeedBackPage";
import TagManagementPage from "./components/TagManagementPage";
import ArticlePage from "./components/ArticlePage";
import ArticleViewPage from "./components/ArticleViewPage";
import PostedQuestionsReport from "./components/PostedQuestionsReport"; // Import the PostedQuestionsReport component
import ArticleReport from "./components/ArticleReport";
import UserList from "./components/UserList";

const Routes = () => {
  const classes = useMainPaperStyles();

  return (
    <Switch>
      <Route exact path="/">
        <Container disableGutters className={classes.homepage}>
          <div className={classes.postsPanel}>
            <PostFormModal />
            <PostList />
          </div>
          <TopSubsPanel />
        </Container>
      </Route>
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
      <Route exact path="/r/:sub">
        <SubPage />
      </Route>
      <Route exact path="/search/:query">
        <SearchResults />
      </Route>
      <Route exact path="/settings/:username">
        <SettingsPage />
      </Route>
      <Route exact path="/tags/:tags">
        <TagBasedSearchResults />
      </Route>
      <Route exact path="/leaderboard">
        <LeaderBoard />
      </Route>
      <Route exact path="/report">
        <ReportPage />
      </Route>
      <Route exact path="/tagreport">
        <TagReport />
      </Route>
      <Route exact path="/qleaderboard">
        <QLeaderBoardReport />
      </Route>
      <Route exact path="/aleaderboard">
        <ALeaderBoardReport />
      </Route>
      <Route exact path="/notificationreport">
        <NotificationReport />
      </Route>
      <Route exact path="/postreport">
        <PostReport />
      </Route>
      <Route exact path="/feedback">
        <FeedBackPage />
      </Route>
      <Route exact path="/tagmanage">
        <TagManagementPage />
      </Route>
      <Route exact path="/article">
        <ArticlePage />
      </Route>
      <Route exact path="/article/:title">
        <ArticleViewPage />
      </Route>
      {/* Add the PostedQuestionsReport route */}
      <Route exact path="/posted-questions-report">
        <PostedQuestionsReport />
      </Route>
      <Route exact path="/articlereport">
        <ArticleReport />
      </Route>
      <Route exact path="/userslist">
        <UserList />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;

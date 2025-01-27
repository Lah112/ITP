import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostCard';
import LoadMoreButton from './LoadMoreButton';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';

import { Container, Paper, Typography } from '@material-ui/core';
import { useSearchPageStyles } from '../styles/muiStyles';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const TagBasedSearchResults = () => {
  const classes = useSearchPageStyles();
  const { tags } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3005/api/posts/searchbytag", {
          tags: tags.split(','),
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(getErrorMsg(err));
        setLoading(false);
      }
    };
    fetchPosts();
  }, [tags]);

  if (loading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={'Loading posts...'} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Typography variant="h6" color="secondary" className={classes.infoPaper}>
          Showing search results for tags: "{tags}"
        </Typography>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <Typography variant="h5" className={classes.noResults}>
            <SentimentVeryDissatisfiedIcon className={classes.sorryIcon} color="primary" />
            Sorry, there were no posts for the tags: "{tags}"
          </Typography>
        )}
        {/* Add a LoadMoreButton if you have pagination */}
      </Paper>
    </Container>
  );
};

export default TagBasedSearchResults;

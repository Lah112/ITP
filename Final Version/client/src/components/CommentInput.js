import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/postCommentsReducer';
import { notify } from '../reducers/notificationReducer';
import getErrorMsg from '../utils/getErrorMsg';
import axios from 'axios';
import { Link, Typography, TextField, Button } from '@material-ui/core';
import { useCommentInputStyles } from '../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';

const CommentInput = ({ user, postId, isMobile, author, title }) => {
  const classes = useCommentInputStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fetchEmailById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/users/email/${id}`);
      return response.data.email; // Assuming the response contains an 'email' field
    } catch (error) {
      console.error("Error fetching email:", error);
      return null; // Return null or handle the error as needed
    }
  };
  const getEmailForUser = async (userId) => {
    const email = await fetchEmailById(userId);
    console.log(`Email for user ID ${userId}:`, email);
    // You can use the email as needed in your application
  };
  
  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await dispatch(addComment(postId, comment));
      setSubmitting(false);
      setComment('');
      dispatch(notify(`Comment submitted!`, 'success'));
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <div className={classes.wrapper}>
      {user ? (
        <Typography variant="body2">
          Comment as{' '}
          <Link component={RouterLink} to={`/u/${user.username}`}>
            {user.username}
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          Log in or sign up to leave a comment
        </Typography>
      )}
      <form className={classes.form} onSubmit={handlePostComment}>
        <TextField
          placeholder={`What are your thoughts?`}
          multiline
          fullWidth
          required
          rows={4}
          rowsMax={Infinity}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.commentBtn}
          startIcon={<SendIcon />}
          size={isMobile ? 'small' : 'medium'}
          disabled={!user || submitting}
          onClick={async () => {
            try {
              const response = await axios.post('http://localhost:3005/api/notification/create', {
                reciverId: author.id,
                senderId: user.id,
                reciverEmail: await getEmailForUser(author.id),
                title: "New Answer",
                description: `${user.username} added a new answer to your question ${title}.`,
                
              });
              console.log('Notification sent successfully:', response.data);
            } catch (error) {
              console.error('Error sending notification:', error);
            }
          }}
        >
          {!user ? 'Login to comment' : submitting ? 'Commenting' : 'Comment'}
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;

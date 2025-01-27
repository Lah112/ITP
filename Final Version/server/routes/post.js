const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getPosts,
  getSubscribedPosts,
  getSearchedPosts,
  getPostAndComments,
  createNewPost,
  updatePost,
  deletePost,
  getSearchedPostsByTag,
  getUserPoints,
  getUserAnswerPoints,
  getUserTotalAnswerPoints,
  getAllPostsTagReport,
} = require('../controllers/post');
const { upvotePost, downvotePost } = require('../controllers/postVote');
const {
  postComment,
  deleteComment,
  updateComment,
  postReply,
  deleteReply,
  updateReply,
  viewAllComments,
} = require('../controllers/postComment');
const {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
} = require('../controllers/commentVote');

const router = express.Router();

//CRUD posts routes
router.get('/', getPosts);
router.get('/point/questions',getUserPoints);
router.get('/point/answers',getUserAnswerPoints);

router.get('/tag-report', getAllPostsTagReport);
router.get('/search', getSearchedPosts);
router.post('/searchbytag', getSearchedPostsByTag);
router.get('/:id/comments', getPostAndComments);
router.get('/subscribed', auth, getSubscribedPosts);
router.post('/', auth, createNewPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.get('/comment', viewAllComments);

//posts vote routes
router.post('/:id/upvote', auth, upvotePost);
router.post('/:id/downvote', auth, downvotePost);

//post comments routes
router.post('/:id/comment', auth, postComment);
router.delete('/:id/comment/:commentId', auth, deleteComment);
router.patch('/:id/comment/:commentId', auth, updateComment);
router.post('/:id/comment/:commentId/reply', auth, postReply);
router.delete('/:id/comment/:commentId/reply/:replyId', auth, deleteReply);
router.patch('/:id/comment/:commentId/reply/:replyId', auth, updateReply);

//comment vote routes
router.post('/:id/comment/:commentId/upvote', auth, upvoteComment);
router.post('/:id/comment/:commentId/downvote', auth, downvoteComment);
router.post('/:id/comment/:commentId/reply/:replyId/upvote', auth, upvoteReply);
router.post(
  '/:id/comment/:commentId/reply/:replyId/downvote',
  auth,
  downvoteReply
);

module.exports = router;

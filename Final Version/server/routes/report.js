const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct
const Post = require('../models/post'); // Ensure the Post model is defined correctly

// Route to get user report summary
router.get('/user-summary', async (req, res) => {
    try {
        // Fetch all users with their posts
        const users = await User.find()
            .populate('posts') // Populate posts to get details if needed
            .select('username email totalComments karmaPoints posts'); // Only select necessary fields

        // Map the users to a summary format
        const userSummary = users.map(user => ({
            username: user.username,
            email: user.email,
            totalPosts: user.posts.length,
            totalComments: user.totalComments,
            postKarma: user.karmaPoints.postKarma,
            commentKarma: user.karmaPoints.commentKarma,
        }));

        res.json(userSummary); // Respond with the user summary
    } catch (error) {
        console.error('Error fetching user summary:', error);
        res.status(500).json({ message: 'Error fetching user summary', error });
    }
});

// Route to get posted questions summary
router.get('/posted-questions-summary', async (req, res) => {
    try {
        // Fetch all posts and select necessary fields (you can customize fields as needed)
        const posts = await Post.find().select('title content createdAt author email');
        
        res.json(posts); // Respond with the posts data to the frontend
    } catch (error) {
        console.error('Error fetching posted questions summary:', error);
        res.status(500).json({ message: 'Error fetching posted questions summary', error });
    }
});

module.exports = router;

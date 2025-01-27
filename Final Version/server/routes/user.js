const express = require('express');
const User = require('../models/user');
const { auth } = require('../utils/middleware');
const {
  getUser,
  setUserAvatar,
  removeUserAvatar,
  updateUser,
  updatebirthyear,
  getUsernameById,
  updateUserRole,
  getEmailById,
} = require('../controllers/user');

const router = express.Router();
// GET all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, 'username email role'); // Fetch only username, email, and role
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/:username', getUser);
router.post('/avatar', auth, setUserAvatar);
router.delete('/avatar', auth, removeUserAvatar);
router.put('/user-name', updateUser);

router.put('/birth-year', updatebirthyear);
router.put('/user-role', updateUserRole);
router.get('/name/:id',getUsernameById);
router.get('/email/:id',getEmailById);

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(204).end();  // Success, no content
  } catch (error) {
    res.status(500).send({ error: 'Server error while deleting user' });
  }
});

router.get('/user/:username', async (req, res) => {
  try {
    console.log("Received request for username:", req.params.username);
    // Get the username from the request parameters
    const username = req.params.username;

    // Fetch the user from the database by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back user data
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;

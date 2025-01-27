const express = require('express');
const { auth } = require('../utils/middleware');
const {
  createTag,
  updateTag,
  deleteTag,
  getUserTags,
  getAllTags,
} = require('../controllers/tagController');

const router = express.Router();

// Routes for managing tags with authentication
router.post('/',createTag); // Create a new tag
router.put('/:id', updateTag); // Update an existing tag
router.delete('/:id', deleteTag); // Delete a tag

// Routes for retrieving tags
router.get('/user/:id', getUserTags); // Get tags created by the logged-in user
router.get('/', getAllTags); // Get all tags

module.exports = router;

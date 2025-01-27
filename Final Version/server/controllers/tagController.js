const Tag = require('../models/Tag');
const User = require('../models/user'); // Import the User model to fetch user details

// // Create a new tag
const createTag = async (req, res) => {
  const { name,createdBy } = req.body;

  try {
    
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: 'Tag already exists' });
    }

    const newTag = new Tag({ name, createdBy });
    await newTag.save();
    
    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// // Delete a tag by its ID
const deleteTag = async (req, res) => {
  const  tagId = req.params.id;
  console.log("tagid",tagId);
  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    await tag.remove();

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// // Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching all tags:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get tags created by the logged-in user
const getUserTags = async (req, res) => {
  const userId = req.params.id;

  try {
    const tags = await Tag.find({ createdBy: userId });
    res.status(200).json(tags);
    // res.status(200).json({message:"success"});
  } catch (error) {
    console.error('Error fetching user tags:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a tag by its ID
const updateTag = async (req, res) => {
    const tagId = req.params.id;
    const { name } = req.body;
  
    try {
      // Find the tag by ID
      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      // Check if the new tag name already exists
      const existingTag = await Tag.findOne({ name });
      if (existingTag && existingTag._id.toString() !== tagId) {
        return res.status(400).json({ message: 'Tag with this name already exists' });
      }
  
      // Update the tag's name
      tag.name = name;
      await tag.save();
  
      res.status(200).json(tag);
    } catch (error) {
      console.error('Error updating tag:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

module.exports = { createTag,getUserTags,getAllTags,deleteTag,updateTag };

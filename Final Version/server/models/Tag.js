const mongoose = require('mongoose');
const schemaCleaner = require('../utils/schemaCleaner');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate tags
    trim: true,
    maxlength: 50, // Limit tag length
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(tagSchema);

module.exports = mongoose.model('Tag', tagSchema);

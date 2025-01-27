const mongoose = require("mongoose");
const schemaCleaner = require("../utils/schemaCleaner");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required."],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required."],
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    imageLink: {
      type: String,
      default: "",
    },
    imageId: {
      type: String,
      default: "",
    },
  },
  link: {
    type: String,
    default: "",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

schemaCleaner(articleSchema);

module.exports = mongoose.model("Article", articleSchema);

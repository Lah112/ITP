const Article = require("../models/Article");
const User = require("../models/user");
const { cloudinary, UPLOAD_PRESET } = require("../utils/config");

const getAllArticles = async (req, res) => {
  try {
    //   get articles with author name
    const articles = await Article.find().populate("author", "username");
    res.json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createArticle = async (req, res) => {
  const { title, content, category, tags, imageSubmission, linkSubmission } =
    req.body;

  try {
    const author = await User.findById(req.user);

    // check if author exists
    if (!author) {
      return res
        .status(404)
        .send({ message: "User does not exist in database." });
    }

    const newArticle = new Article({
      title,
      content,
      category,
      link: linkSubmission,
      tags,
      author: author.id,
    });

    if (imageSubmission) {
      // upload image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(
        imageSubmission,
        {
          upload_preset: UPLOAD_PRESET,
        }
      );

      newArticle.image.imageLink = uploadedResponse.secure_url;
      newArticle.image.imageId = uploadedResponse.public_id;
    }
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username"
    );
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { title, content, category, tags, imageSubmission, linkSubmission } =
    req.body;

  try {
    const author = await User.findById(req.user);

    // check if author exists
    if (!author) {
      return res
        .status(404)
        .send({ message: "User does not exist in database." });
    }

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).send({ message: "Article not found." });
    }

    if (article.author.toString() !== req.user) {
      return res.status(401).send({ message: "Unauthorized." });
    }

    article.title = title;
    article.content = content;
    article.category = category;
    article.tags = tags;
    article.link = linkSubmission;

    if (imageSubmission) {
      // upload image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(
        imageSubmission,
        {
          upload_preset: UPLOAD_PRESET,
        }
      );

      article.image.imageLink = uploadedResponse.secure_url;
      article.image.imageId = uploadedResponse.public_id;
    }

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ message: "Article not found." });
    }
    if (article.author.toString() !== req.user) {
      return res.status(401).send({ message: "Unauthorized." });
    }
    await article.remove();
    res.json({ message: "Article deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleReport = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "username");
    const groupedByAuthor = articles.reduce((acc, item) => {
      const username = item.author.username;
      if (!acc[username]) {
        acc[username] = [];
      }
      acc[username].push(item);
      return acc;
    }, {});

    const report = Object.keys(groupedByAuthor).map((key) => {
      return {
        username: key,
        userId : groupedByAuthor[key][0].author._id,
        articleCount: groupedByAuthor[key].length,
        articlesTitlesWithDate: groupedByAuthor[key].map((article) => {
          return {
            title: article.title,
            date: article.createdAt,
            id: article._id,
            catergoty: article.category,
          };
        }),
      };
    });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleReport,
};

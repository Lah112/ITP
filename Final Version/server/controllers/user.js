const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require("mongoose");

const { cloudinary, UPLOAD_PRESET } = require('../utils/config');
const paginateResults = require('../utils/paginateResults');

const getUser = async (req, res) => {
  const { username } = req.params;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  
  const user = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  })
  console.log(user);
  if (!user) {
    return res
      .status(404)
      .send({ message: `Username '${username}' does not exist on server.` });
  }

  const postsCount = await Post.find({ author: user.id }).countDocuments();
  const paginated = paginateResults(page, limit, postsCount);
  const userPosts = await Post.find({ author: user.id })
    .sort({ createdAt: -1 })
    .select('-comments')
    .limit(limit)
    .skip(paginated.startIndex)
    .populate('author', 'username')
    .populate('subreddit', 'subredditName');

  const paginatedPosts = {
    previous: paginated.results.previous,
    results: userPosts,
    next: paginated.results.next,
  };

  res.status(200).json({ userDetails: user, posts: paginatedPosts });
};

async function getUserIdByEmail(email) {
  try {
    const user = await User.findOne({ email }); // Query the user by email
    if (user) {
      return user._id; // Return the user ID
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error; // Handle errors here as needed
  }
}


const updateUserRole = async (req, res) => {
  console.log("update user role in controller")
  //const { userId } = req.user; 
  const { email, newRole } = req.body;

  let userId = await getUserIdByEmail(email);
  console.log(userId);
  

  try {
    // Logic to update the birthyear in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    console.error('Error updating year:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updatebirthyear = async (req, res) => {
  console.log("updatyear in controller")
  //const { userId } = req.user; 
  const { userId, newBirthyear } = req.body;
  console.log(userId);
  

  try {
    // Logic to update the birthyear in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newBirthyear },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    console.error('Error updating year:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateUser = async (req, res) => {
  console.log("updateuser in controller")
  //const { userId } = req.user; 
  const { userId, newUsername } = req.body;
  console.log(userId);
  console.log(newUsername);

  try {
    // Logic to update the username in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const setUserAvatar = async (req, res) => {
  const { avatarImage } = req.body;

  if (!avatarImage) {
    return res
      .status(400)
      .send({ message: 'Image URL needed for setting avatar.' });
  }

  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const uploadedImage = await cloudinary.uploader.upload(
    avatarImage,
    {
      upload_preset: UPLOAD_PRESET,
    },
    (error) => {
      if (error) return res.status(401).send({ message: error.message });
    }
  );

  user.avatar = {
    exists: true,
    imageLink: uploadedImage.url,
    imageId: uploadedImage.public_id,
  };

  const savedUser = await user.save();
  res.status(201).json({ avatar: savedUser.avatar });
};

const removeUserAvatar = async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  user.avatar = {
    exists: false,
    imageLink: 'null',
    imageId: 'null',
  };

  await user.save();
  res.status(204).end();
};
const getUsernameById = async (req, res) => {
  const { id } = req.params; // Expecting the user ID in the request parameters

  if (!id) {
    return res.status(400).send({ message: "User ID is required." });
  }

  try {
    // Ensure the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID format." });
    }

    // Find the user by ID
    const user = await User.findById(id).select("username"); // Only select the username field

    if (!user) {
      return res
        .status(404)
        .send({ message: `User with ID '${id}' does not exist.` });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error("Error retrieving username by ID:", error);
    res
      .status(500)
      .send({ message: "Error retrieving username by ID.", error });
  }
};

const getEmailById = async (req, res) => {
  const { id } = req.params; // Expecting the user ID in the request parameters

  if (!id) {
    return res.status(400).send({ message: "User ID is required." });
  }

  try {
    // Ensure the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {

      return res.status(400).send({ message: "Invalid user ID format." });
    }

    // Find the user by ID
    const
    user = await User.findById(id).select("email"); // Only select the email field

    if (!user) {
      return res
        .status(404)
        .send({ message: `User with ID '${id}' does not exist.` });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {

    console.error("Error retrieving email by ID:", error);
    res
      .status(500)
      .send({ message: "Error retrieving email by ID.", error });
  }
};


module.exports = { getUser, setUserAvatar, removeUserAvatar, updateUser, updatebirthyear ,getUsernameById, updateUserRole, getEmailById};

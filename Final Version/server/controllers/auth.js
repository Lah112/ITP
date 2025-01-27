// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
// const { SECRET } = require('../utils/config');

// const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({
//     username: { $regex: new RegExp('^' + username + '$', 'i') },
//   });

//   if (!user) {
//     return res
//       .status(400)
//       .send({ message: 'No account with this username has been registered.' });
//   }

//   const credentialsValid = await bcrypt.compare(password, user.passwordHash);

//   if (!credentialsValid) {
//     return res.status(401).send({ message: 'Invalid username or password.' });
//   }

//   const payloadForToken = {
//     id: user._id,
//   };

//   const token = jwt.sign(payloadForToken, SECRET);

//   res.status(200).json({
//     token,
//     username: user.username,
//     id: user._id,
//     avatar: user.avatar,
//     karma: user.karmaPoints.postKarma + user.karmaPoints.commentKarma,
//   });
// };

// const signupUser = async (req, res) => {
//   const { username, password } = req.body;

//   if (!password || password.length < 6) {
//     return res
//       .status(400)
//       .send({ message: 'Password needs to be atleast 6 characters long.' });
//   }

//   if (!username || username.length > 20 || username.length < 3) {
//     return res
//       .status(400)
//       .send({ message: 'Username character length must be in range of 3-20.' });
//   }

//   const existingUser = await User.findOne({
//     username: { $regex: new RegExp('^' + username + '$', 'i') },
//   });

//   if (existingUser) {
//     return res.status(400).send({
//       message: `Username '${username}' is already taken. Choose another one.`,
//     });
//   }

//   const saltRounds = 10;
//   const passwordHash = await bcrypt.hash(password, saltRounds);

//   const user = new User({
//     username,
//     passwordHash,
//   });

//   const savedUser = await user.save();

//   const payloadForToken = {
//     id: savedUser._id,
//   };

//   const token = jwt.sign(payloadForToken, SECRET);

//   res.status(200).json({
//     token,
//     username: savedUser.username,
//     id: savedUser._id,
//     avatar: savedUser.avatar,
//     karma: 0,
//   });
// };

// module.exports = { loginUser, signupUser };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SECRET } = require('../utils/config');


const OtpModel = require('../models/Otp');
const { sendEmail } = require('../utils/sendEmail'); // Assume this function is defined to handle email sending

const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Store the OTP in the database (or update if it already exists for the email)
    await OtpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send the OTP to the user's email
    await sendEmail(email, `Your OTP Code is ${otp}`);

    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending OTP", error });
  }
};


const verifyOtp = async (req, res) => {
  console.log("verify func called");
  
  const { email, otp } = req.body;
  console.log(otp);
  console.log(email);
  try {
    // Fetch the stored OTP for the email from the database
    console.log("verify func called try");
    const storedOtp = await OtpModel.findOne({ email });
    
    console.log(storedOtp.otp);

    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
      console.log("Invalid OTP");
    }

    // OTP is valid, optionally delete the OTP after verification
    await OtpModel.deleteOne({ email });
    console.log("OTP verified successfully");
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error verifying OTP", error });
  }
};


const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email) { // just for debuging
    console.error('Email is missing');
    return res.status(400).send({ message: 'Email is required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .send({ message: 'No account with this email has been registered.' });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ message: 'Invalid username or password.' });
  }

  const payloadForToken = {
    id: user._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: user.username,
    email: user.email,
    id: user._id,
    avatar: user.avatar,
    karma: user.karmaPoints.postKarma + user.karmaPoints.commentKarma,
  });
};

const signupUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password, role: inputRole } = req.body;
  console.log("input role: "+inputRole);
  

  if (!email) {
    console.error('Email is missing');
    return res.status(400).send({ message: 'Email is required' });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ message: 'Password needs to be atleast 6 characters long.' });
  }

  if (!username || username.length > 20 || username.length < 3) {
    return res
      .status(400)
      .send({ message: 'Username character length must be in range of 3-20.' });
  }



  if (!email || !email.endsWith('@my.sliit.lk')) {
    return res
      .status(400)
      .send({ message: 'Invalid email. Must be an SLIIT email (my.sliit.lk).' });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(400)
      .send({ message: 'Email is already registered.' });
  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });



  if (existingUser) {
    return res.status(400).send({
      message: `Username '${username}' is already taken. Choose another one.`,
    });
  }

  const userCount = await User.countDocuments();
  //const role = userCount === 0 ? 'admin' : 'user';

  let role;  // declare role with let for reassignment

  if (userCount === 0) {
    role = 'admin';  // assign 'admin' if first user
  } else {
    console.log("input role: "+inputRole);
    role = inputRole || 'user';  // use the provided role or default to 'user'
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
    role,
  });

  const savedUser = await user.save();

  const payloadForToken = {
    id: savedUser._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: savedUser.username,
    email: savedUser.email,
    id: savedUser._id,
    avatar: savedUser.avatar,
    karma: 0,
    role: savedUser.role,
  });
};

module.exports = { loginUser, signupUser, sendOtpToEmail, verifyOtp };

const express = require('express');
const { loginUser, signupUser } = require('../controllers/auth');
const { sendOtpToEmail, verifyOtp } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/send-otp', sendOtpToEmail);

router.post('/verify-otp', verifyOtp);

module.exports = router;

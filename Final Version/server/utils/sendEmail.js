const nodemailer = require('nodemailer');

const sendEmail = async (to, content) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: content,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
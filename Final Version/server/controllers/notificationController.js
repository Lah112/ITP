const Notification = require('../models/Notification');
const nodemailer = require('nodemailer'); 
const User = require('../models/user');
const mongoose = require('mongoose'); // Change this to require


const emailSender = async ({
  reciverEmail,
  subject,
  html,
}) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your email service
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: reciverEmail,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
};
// Get notifications for a specific user
exports.getNotificationsByUser = async (req, res) => {
    const userId = req.params.userId; // Extract userId from req.params
    console.log('Received userId:', userId); // Log the userId for debugging
    try {
      const notifications = await Notification.find({ reciverId: userId }).sort({ time: -1 });
      console.log('Fetched notifications:', notifications); // Log the fetched notifications
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error); // Log the error
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  };

// Get all notifications

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ time: -1 });
    console.log('Fetched notifications:', notifications); // Log the fetched notifications
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error); // Log the error
    res.status(500).json({ message: 'Error fetching notifications', error });
    }
  };

// Create a new notification
exports.createNotification = async (req, res) => {
  const { reciverId, senderId, reciverEmail, title, description } = req.body;
  console.log( reciverEmail);
  try {
    const newNotification = new Notification({
        reciverId,
        senderId,
        title,
        description,
    });
    await newNotification.save();
    await emailSender({
      reciverEmail: reciverEmail, // Send email to the receiver's email
      subject: `New Notification: ${title}`, // Email subject
      html: `<h1>${title}</h1><p>${description}</p><p>Check your notifications for more details.</p>`, // Email content
    })
    res.status(200).json("dsfdsfs");
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Create a notice by admin to all users
exports.createNotice = async (req, res) => {
  const { title, description } = req.body;
  const senderId = mongoose.Types.ObjectId('6702a587f45f394e78285550'); // Admin ID

  try {
    // Fetch all users except admin
    const users = await User.find({ role: 'user' });

    // Iterate over each user and create a notification
    for (const user of users) {
      const newNotification = new Notification({
        reciverId: user._id,
        senderId,
        title,
        description,
        type: 'notice',
      });

      // Save the notification for each user
      await newNotification.save();

      // Send email to each user
      // await emailSender({
      //   reciverEmail: user.email, // Use the user's email
      //   subject: `New Notice: ${title}`, // Email subject
      //   html: `<h1>${title}</h1><p>${description}</p><p>Check your notifications for more details.</p>`, // Email content
      // });
    }

    res.status(200).json({ message: "Notices sent to all users." });

  } catch (error) {
    console.error('Error creating notices:', error);
    res.status(500).json({ error: 'Error creating notices.' });
  }
};

// get all notification which are only type: 'notice'
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notification.find({ type: 'notice' }).sort({ time: -1 });
    res.status(200).json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices', error });
  }
};

// update notices
exports.updateNotice = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const notice = await Notification.findByIdAndUpdate(id, { description }, { new: true });
    if (!notice) return res.status(404).send('Notice not found');
    res.send(notice);
  } catch (error) {
    res.status(500).send('Error updating notice');
  }
};

// Delete a notification by its ID
exports.deleteNotification = async (req, res) => {
    const { id } = req.params; // Extract the notification ID from request parameters
    console.log('Deleting notification with ID:', id); // Log the ID for debugging
    try {
      const deletedNotification = await Notification.findByIdAndDelete(id); // Find and delete the notification
      if (deletedNotification) {
        res.status(200).json({ message: 'Notification deleted successfully', deletedNotification });
      } else {
        res.status(404).json({ message: 'Notification not found' });
      }
    } catch (error) {
      console.error('Error deleting notification:', error); // Log the error
      res.status(500).json({ message: 'Error deleting notification', error });
    }
  };

// Update a notification to toggle isRead status
exports.updateNotification = async (req, res) => {
  const { id } = req.params; // Get notification ID from request params
  try {
    const notification = await Notification.findById(id); // Find the notification by ID
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Toggle the isRead status
    notification.isRead = !notification.isRead;

    await notification.save(); // Save the updated notification

    res.status(200).json({
      message: 'Notification updated successfully',
      notification,
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Error updating notification', error });
  }
};

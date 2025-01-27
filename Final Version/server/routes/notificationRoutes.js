const express = require('express');
const { getNotificationsByUser, createNotification, deleteNotification, updateNotification, getAllNotifications, createNotice, getAllNotices, updateNotice } = require('../controllers/notificationController');

const router = express.Router();

// GET notifications for a specific user
router.get('/:userId', getNotificationsByUser);
router.post('/create', createNotification);
router.delete('/:id', deleteNotification);
router.put('/markAsRead/:id', updateNotification);
router.get('/', getAllNotifications);
router.post('/createNotice', createNotice);
router.get('/get/AllNotices', getAllNotices);
router.put('/updateNotice/:id', updateNotice);


module.exports = router;

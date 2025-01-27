const { createNotification } = require('../controllers/notificationController');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for notification events
    socket.on('sendNotification', async ({ userId, title, description }) => {
      // Create new notification in the database
      const newNotification = await createNotification({ userId, title, description });

      // Emit the new notification to the specific user
      io.emit(`notification-${userId}`, {
        title: newNotification.title,
        description: newNotification.description,
        time: new Date().toLocaleTimeString(),
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = socketHandler;

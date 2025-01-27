const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
  reciverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isRead:{type:Boolean,default:false,required:true},
  type: {
    type: String,
    enum: ['normal', 'notice'],
    default: 'normal'
  },
});

module.exports = mongoose.model('Notification', notificationSchema);

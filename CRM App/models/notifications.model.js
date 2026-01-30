const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    ticketId:{
        type: String
    },
    isRead:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notification', notificationSchema);
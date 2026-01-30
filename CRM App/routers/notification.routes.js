const express = require('express');
const route = express.Router();
const authJWT = require('../middlewares/authjwt');
const notificationController = require('../controllers/notification.controller')

// Route to get all notifications for a specific user
route.get('/notifications/:userId', [authJWT.verifyToken], notificationController.getNotifications);

route.put("/notifications/readAll/:userId", [authJWT.verifyToken], notificationController.markAllAsRead);

// Route to mark a specific notification as read
route.put('/notifications/:id/read', [authJWT.verifyToken], notificationController.markAsRead);




module.exports = route;
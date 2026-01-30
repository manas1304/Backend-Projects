const Notification = require("../models/notifications.model");

// Fetch all notifications for a specific user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiverId: req.params.userId
        }).sort({ createdAt: -1 }); // Newest first

        res.status(200).send(notifications);
    } catch (err) {
        res.status(500).send({
            message: "Error fetching notifications"
        });
    }
};

// Mark a specific notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).send({ message: "Notification not found" });
        }

        res.status(200).send(notification);
    } catch (err) {
        res.status(500).send({
            message: "Error updating notification status"
        });
    }
};


exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { receiverId: req.params.userId, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).send({ message: "All notifications marked as read" });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};
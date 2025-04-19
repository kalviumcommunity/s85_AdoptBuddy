const express = require('express');
const router = express.Router();
const Notification = require('../Models/notificationSchema'); // Adjust path if needed

// CREATE a new notification
router.post('/', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    const notification = new Notification({ userId, type, message });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ all notifications for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MARK a notification as read
router.patch('/:id/read', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MARK all notifications as read for a user
router.patch('/user/:userId/read-all', async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.params.userId, isRead: false }, { $set: { isRead: true } });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a notification
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ActivityLog = require('../Models/activityLogSchema'); // Adjust the path as needed

// CREATE a new activity log
router.post('/', async (req, res) => {
  try {
    const { userId, action, targetId } = req.body;
    const log = new ActivityLog({ userId, action, targetId });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all activity logs (admin usage or analytics)
router.get('/', async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'username') // Adjust if you want more fields
      .sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET activity logs for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.params.userId })
      .sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a specific log entry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json({ message: 'Activity log deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

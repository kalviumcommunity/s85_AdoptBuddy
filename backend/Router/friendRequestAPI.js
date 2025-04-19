const express = require('express');
const router = express.Router();
const FriendRequest = require('../Models/friendRequestSchema'); // Adjust the path as needed

// SEND a friend request
router.post('/', async (req, res) => {
  try {
    const { from, to } = req.body;

    // Check if a request already exists
    const existing = await FriendRequest.findOne({ from, to });
    if (existing) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({ from, to });
    await friendRequest.save();
    res.status(201).json(friendRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET friend requests for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      $or: [{ from: req.params.userId }, { to: req.params.userId }]
    })
    .populate('from', 'username')  // Assuming you have `username` in User
    .populate('to', 'username')
    .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE status (accept/reject)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedRequest = await FriendRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) return res.status(404).json({ message: 'Friend request not found' });
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a friend request
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await FriendRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Friend request not found' });
    res.status(200).json({ message: 'Friend request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

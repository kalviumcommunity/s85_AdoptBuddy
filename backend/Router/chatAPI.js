const express = require('express');
const router = express.Router();
const Chat = require('../Models/chatSchema'); // Adjust path if needed

// CREATE a new chat between users (if not exists)
router.post('/', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body;

    // Check if chat already exists
    let chat = await Chat.findOne({ members: { $all: [user1Id, user2Id] } });
    if (chat) return res.status(200).json(chat);

    // Create new chat
    chat = new Chat({ members: [user1Id, user2Id] });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all chats for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.params.userId })
      .populate('members', 'username') // Adjust if needed
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific chat by ID
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('members', 'username');
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE chat (e.g., update lastMessage + updatedAt)
router.patch('/:id', async (req, res) => {
  try {
    const { lastMessage } = req.body;
    const updated = await Chat.findByIdAndUpdate(
      req.params.id,
      { lastMessage, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Chat not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a chat
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Chat not found' });
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../Models/messageSchema'); // Adjust path
const Chat = require('../Models/chatSchema'); // Optional if you want to verify chat existence

// CREATE a new message
router.post('/', async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new Message({ chatId, senderId, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all messages in a chat
router.get('/chat/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort({ sentAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a message (usually not common, but included if needed)
router.put('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a message
router.delete('/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

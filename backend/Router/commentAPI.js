const express = require('express');
const router = express.Router();
const Comment = require('../Models/commentSchema'); // Adjust path if needed

// CREATE a new comment on a post
router.post('/', async (req, res) => {
  try {
    const { postId, userId, text } = req.body;
    const comment = new Comment({ postId, userId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username') // assuming User model has username
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId', 'username');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a comment
router.put('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

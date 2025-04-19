const express = require('express');
const router = express.Router();
const SavedPost = require('../Models/savedPostSchema'); // adjust path if needed

// CREATE a saved post
router.post('/', async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const savedPost = new SavedPost({ userId, postId });
    await savedPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ all saved posts for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const savedPosts = await SavedPost.find({ userId: req.params.userId }).populate('postId');
    res.status(200).json(savedPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a specific saved post (optional)
router.get('/:id', async (req, res) => {
  try {
    const savedPost = await SavedPost.findById(req.params.id).populate('postId');
    if (!savedPost) return res.status(404).json({ message: 'Saved post not found' });
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a saved post (e.g., change postId)
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await SavedPost.findByIdAndUpdate(
      req.params.id,
      { postId: req.body.postId },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Saved post not found' });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a saved post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await SavedPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Saved post not found' });
    res.status(200).json({ message: 'Saved post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

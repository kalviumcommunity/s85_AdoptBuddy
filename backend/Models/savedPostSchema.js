const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedPost', savedPostSchema);

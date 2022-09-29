const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');

const search = asyncHandler(async (req, res) => {
  const { query } = req.params;

  if (!query) {
    return res.status(400).json({ message: 'Nie podano wyszukiwanej frazy' });
  }

  const users = await User.find({
    username: { $regex: query, $options: 'i' },
  }).select('username picture_url');

  const posts = await Post.find({ content: { $regex: query, $options: 'i' } });

  if (users.length === 0 && posts.length === 0) {
    return res.status(400).json({ message: 'Nie znaleziono' });
  }

  res.json({ users, posts });
});

module.exports = { search };


import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @route  GET /api/posts
// @desc   Fetches posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);
  // const posts = await Post.find().sort({ _id: -1 });
  let posts = await Post.find({
    author: { $not: { $eq: user._id } },
    _id: { $not: { $in: user.liked } },
  }).sort({
    _id: -1,
  });

  if (!posts) throw new Error('Nie odnaleziono postów');

  res.send(posts);
});

// @route  POST /api/posts
// @desc   Creates a post
// @access Private
const postPost = asyncHandler(async (req, res) => {
  const { content, user: author } = req.body;

  if (!content || !author) {
    throw new Error('Brak danych do dodania wpisu');
  }

  const post = Post.create({
    content,
    author,
  });

  res.status(200).json({ message: 'Poprawnie dodano post' });
});

// @route  GET /api/posts/liked
// @desc   Fetches liked posts
// @access Private
const getLikedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);

  if (!user) throw new Error('Nie odnaleziono użytkownika');

  const posts = await Post.find({ _id: { $in: user.liked } }).sort({
    _id: -1,
  });

  if (!posts) throw new Error('Nie odnaleziono postów');

  res.status(200).json(posts);
});

const getUsersPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new Error('Nie odnaleziono użytkownika');

  const posts = await Post.find({ author: user._id }).sort({ _id: -1 });

  if (!posts) throw new Error('Nie odnaleziono postów');

  res.status(200).json(posts);
});

// @route  GET /api/posts/followrd
// @desc   Fetches followed user's posts
// @access Private
const getFollowedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);

  const posts = await Post.find({ author: { $in: user.followers } }).sort({
    _id: -1,
  });

  if (!posts) throw new Error('Nie odnaleziono postów');

  res.status(200).json(posts);
});

// @route  POST /api/posts/like/:id
// @desc   Likes a post
// @access Private
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user, mode } = req.body;
  if (mode == undefined) mode = 1;

  const post = await Post.findById(id);

  if (!post) throw new Error('Nie odnaleziono posta');

  await post.updateOne({ likes: post.likes + mode });

  const userRecord = await User.findById(user);

  if (mode === 1) {
    if (userRecord.liked.length > 0)
      await userRecord.updateOne({
        liked: [...userRecord.liked, id],
      });
    else {
      await userRecord.updateOne({ liked: [id] });
    }
  } else if (mode === -1) {
    await userRecord.updateOne({
      liked: userRecord.liked.filter((postId) => postId != id),
    });
  }
  res.status(200).json({ message: 'Poprawnie dodano post' });
});

// @route  DELETE /api/posts/:id
// @desc   Deletes a post
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) throw new Error('Nie znaleziono postu');
  else if (post.author != req.body.user) {
    throw new Error('Autor wpisu nie jest aktualnym użytkownikiem');
  } else {
    await post.deleteOne();
    res.json({ message: 'Usunięto post' });
  }
});

export {
  getPosts,
  getLikedPosts,
  getUsersPosts,
  getFollowedPosts,
  postPost,
  likePost,
  deletePost,
};

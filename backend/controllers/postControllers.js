import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @route  GET /api/posts
// @desc   Fetches posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });

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

// @route  PUT /api/post/:id
// @desc   Updates a post
// @access Private
// const putPost = asyncHandler(async (req, res) => {
// });

// TODO: Updaing posts controllers

const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user, mode } = req.body;
  if (mode == undefined) mode = 1;

  const post = await Post.findById(id);

  if (!post) throw new Error('Nie odnaleziono posta');

  await post.updateOne({ likes: post.likes + mode });

  const userRecord = await User.findById(user);

  if (mode === 1) {
    if (userRecord.likedPosts)
      await userRecord.updateOne({
        likedPosts: [...userRecord.likedPosts, id],
      });
    else await userRecord.updateOne({ likedPosts: [id] });
  } else if (mode === -1) {
    await userRecord.updateOne({
      likedPosts: userRecord.likedPosts.filter((postId) => postId !== id),
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

export { getPosts, postPost, likePost, deletePost };

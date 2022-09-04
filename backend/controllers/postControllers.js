import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';

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
  postPost,
  //  putPost,
  deletePost,
};

const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');

// @route  GET /api/posts
// @desc   Fetches posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);

  if(!user) throw new Error('Nie znaleziono użytkownika');


  let posts;
  if(user.settings.showLikedPosts) {
     posts = await Post.find({
      author: {$not: {$eq: user._id}}
    }).sort({ createdAt: -1 });
    res.json(posts);
  }
    else {
    posts = await Post.find({
      author: {$not: {$eq: user._id}},
      _id: {$not: {$in: user.liked}},
    }).sort({
      _id: -1,
    });
  }
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

  if(content.length > 250)
    throw new Error('Wpis może mieć maksymalnie 250 znaków');

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


  let posts = await Post.find({ author: user._id }).sort({ _id: -1 });

  if (!posts) throw new Error('Nie odnaleziono postów');

  res.status(200).json(posts);
});

// @route  GET /api/posts/followed
// @desc   Fetches followed user's posts
// @access Private
const getFollowedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);

  const showLiked = user.settings.showLikedPosts;

  if(!user) throw new Error('Nie odnaleziono użytkownika');

  let posts = await Post.find({ author: { $in: user.followers } }).sort({
    _id: -1,
  });

  if (!posts) throw new Error('Nie odnaleziono postów');

  posts = posts.map(post => {
    if(showLiked) {
      post = {...post, liked: user.liked.includes(post._id)};
    }
    return post;
  });

  res.status(200).json(posts);
});

// @route  POST /api/posts/like/:id
// @desc   Likes a post
// @access Private
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { user, mode } = req.body;
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

//@desc Checks if a post is liked by a user
//@route GET /api/posts/is-liked/:id
//@access Private
const getIsLiked = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    const userRecord = await User.findById(user);

    if (!userRecord) throw new Error('Nie znaleziono użytkownika');

    const isLiked = userRecord.liked.includes(id);

    res.status(200).send(isLiked);
});

module.exports = {
  getPosts,
  getLikedPosts,
  getUsersPosts,
  getFollowedPosts,
  postPost,
  likePost,
  deletePost,
    getIsLiked
};

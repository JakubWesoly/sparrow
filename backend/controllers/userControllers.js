const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');
const Post = require("../models/postModel.js");

// @route GET /api/users/:id
// @desc Get user's name and image by id
// @access Public
const getBasicUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Nie znaleziono użytkownika' });
  }


  res.json({
    _id: user._id,
    name: user.username,
    image: user.picture_url,
    followers: user.followers,
    followed: user.followed,
  });
});

// @route PUT /api/users/settings
// @desc Update user's settings
// @access Private
const setSettings = asyncHandler(async (req, res) => {
  let { name, value } = req.body;

  if (!name || value == null) {
    throw new Error('Nie podano wszystkich danych');
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ message: 'Nie znaleziono użytkownika' });
  }

  if (name === 'password') {
    const salt = await bcrypt.genSalt();
    value = await bcrypt.hash(value, salt);
  }
  if(name === 'username'){
    if(value.length > 20)
      throw new Error('Nazwa użytkownika może mieć maksymalnie 20 znaków');
    if(value.length < 3)
        throw new Error('Nazwa użytkownika musi mieć przynajmniej 3 znaki');
  }
  if (typeof value === 'string') {
    try {
      await user.updateOne({ [name]: value });
      res.status(200).json({ message: 'Zaktualizowano ustawienia' });
    } catch (err) {
      throw new Error('Nie udało się zmienić ustawień');
    }
  } else if (typeof value === 'boolean') {
    await user.updateOne({ settings: { [name]: value } });
  } else {
    throw new Error('Nieprawidłowy typ danych');
  }
});

// @route GET /api/users/get-setting
// @desc Get user's setting
// @access Private
const getSetting = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name) {
    throw new Error('Nie podano ustawienia');
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    throw new Error('Nie znaleziono użytkownika');
  }

  res.status(200).json({ setting: user.settings[name] });
});

// @route PUT /api/users/follow/:id
// @desc Follow user
// @access Private
const followUser = asyncHandler(async (req, res) => {
  const base = await User.findById(req.body.user);
  const target = await User.findById(req.params.id);

  if (!base || !target) {
    throw new Error('Nie znaleziono użytkownika');
  }

  try {
    await base.updateOne({ $push: { followers: target._id } });
  } catch (err) {
    throw new Error('Nie udało się dodać do obserwowanych użytkownika');
  }
  try {
    await target.updateOne({ followed: followed + 1 });
  } catch (err) {
    throw new Error('Nie udało się zwiększyć liczby obserwujących użytkownika');
  }
});

// @route DELETE /api/users/follow/:id
// @desc Unfollow user
// @access Private
const unfollowUser = asyncHandler(async (req, res) => {
  const base = await User.findById(req.body.user);
  const target = await User.findById(req.params.id);

  if (!base || !target) {
    throw new Error('Nie znaleziono użytkownika');
  }

  try {
    await base.updateOne({ $pull: { followers: target._id } });
    await target.updateOne({ followed: followed - 1 });
  } catch (err) {
    throw new Error('Nie udało się przestać obserwować użytkownika');
  }
});

// @route  POST /api/users/login
// @desc   Logging into account
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Brakujące dane logowania');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Nie znaleziono użytkownika');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Niepoprawne hasło');
  }

  res.status(200).json({ token: genToken(user._id) });
});

// @route  POST /api/users/register
// @desc   Registering into account
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Brakujące dane rejestracji');
  }

  if(username.length < 3) {
    throw new Error('Nazwa użytkownika musi mieć co najmniej 3 znaki');
  }
  if(username.length > 20) {
    throw new Error('Nazwa użytkownika może mieć maksymalnie 20 znaków');
  }

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

  const pattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)";

  if (!email.match(pattern)) {
    throw new Error('Niepoprawny e-mail');
  }

  let user;

  try {
    user = await User.create({ username, email, password: hashedPassword });
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }

  if (user) {
    res.status(200);
    res.json({
      token: genToken(user._id),
    });
  }
});

// @route  DELETE /api/users/delete
// @desc   Delete user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user);

    if (!user) {
        throw new Error('Nie znaleziono użytkownika');
    }
    try{
      await Post.find({author: user._id}).deleteMany();

      await user.remove();

      res.status(200).json({ message: 'Usunięto użytkownika' });

    } catch (err) {
      throw new Error('Nie udało się usunąć użytkownika');
    }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  loginUser,
  registerUser,
  getBasicUserInfo,
  setSettings,
  followUser,
  unfollowUser,
  getSetting,
  deleteUser
};

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

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
    followerCount: user.followers.length,
    followed: user.followed,
  });
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

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { loginUser, registerUser, getBasicUserInfo };

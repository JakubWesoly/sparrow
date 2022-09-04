import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
  let { authorization: token } = req.headers;
  if (!token) throw new Error('No token found');
  if (!token.startsWith('Bearer')) throw new Error('Invalid token template');

  token = token.split(' ')[1];
  const result = jwt.decode(token, process.env.JWT_SECRET);
  if (result) {
    const id = JSON.parse(JSON.stringify(result)).id;
    req.body.user = id;
    next();
  } else {
    throw new Error('Not authorized');
  }
});

export default auth;

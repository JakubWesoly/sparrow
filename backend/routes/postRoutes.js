import { Router } from 'express';

import {
  getPosts,
  getLikedPosts,
  getUsersPosts,
  getFollowedPosts,
  postPost,
  likePost,
  deletePost,
  getIsLiked
} from '../controllers/postControllers.js';

import authRoute from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authRoute, getPosts);
router.get('/liked', authRoute, getLikedPosts);
router.get('/user/:id', getUsersPosts);
router.get('/followed', authRoute, getFollowedPosts);
router.post('/', authRoute, postPost);
router.post('/like/:id', authRoute, likePost);
router.delete('/:id', authRoute, deletePost);
router.get('/is-liked/:id', authRoute, getIsLiked);

export default router;

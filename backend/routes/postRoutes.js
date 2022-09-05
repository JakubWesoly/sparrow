import { Router } from 'express';

import {
  getPosts,
  postPost,
  likePost,
  deletePost,
} from '../controllers/postControllers.js';

import authRoute from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPosts);
router.post('/', authRoute, postPost);
// router.put('/:id', authRoute, putPost);
// TODO: Post updating routes
router.post('/like/:id', authRoute, likePost);
router.delete('/:id', authRoute, deletePost);

export default router;

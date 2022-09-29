const Router = require('express').Router;

const {
  getPosts,
  getLikedPosts,
  getUsersPosts,
  getFollowedPosts,
  postPost,
  likePost,
  deletePost,
  getIsLiked
} = require('../controllers/postControllers.js');

const authRoute = require('../middleware/authMiddleware.js');

const router = Router();

router.get('/', authRoute, getPosts);
router.get('/liked', authRoute, getLikedPosts);
router.get('/user/:id', getUsersPosts);
router.get('/followed', authRoute, getFollowedPosts);
router.post('/', authRoute, postPost);
router.post('/like/:id', authRoute, likePost);
router.delete('/:id', authRoute, deletePost);
router.get('/is-liked/:id', authRoute, getIsLiked);

module.exports = router;

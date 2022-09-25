import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getBasicUserInfo,
  setSettings,
  getSetting,
  followUser,
  unfollowUser, deleteUser,
} from '../controllers/userControllers.js';
import authRoute from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:id', getBasicUserInfo);
router.put('/follow/:id', authRoute, followUser);
router.delete('/follow/:id', authRoute, unfollowUser);
router.put('/settings', authRoute, setSettings);
router.get('/get-setting/:name', authRoute, getSetting);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.delete('/delete', authRoute, deleteUser);

export default router;

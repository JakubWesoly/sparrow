import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getBasicUserInfo,
  setSettings,
  getSetting,
} from '../controllers/userControllers.js';
import authRoute from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:id', getBasicUserInfo);
router.put('/settings', authRoute, setSettings);
router.get('/get-setting/:name', authRoute, getSetting);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;

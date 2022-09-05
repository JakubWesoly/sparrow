import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getBasicUserInfo,
} from '../controllers/userControllers.js';

const router = Router();

router.get('/:id', getBasicUserInfo);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;

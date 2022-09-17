import { Router } from 'express';
import { search } from '../controllers/searchControllers.js';

const router = Router();

router.get('/:query', search);

export default router;

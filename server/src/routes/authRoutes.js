import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getMe, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;

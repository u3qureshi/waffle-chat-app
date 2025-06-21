import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';   
import { getUsersForSidebar, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessagesByUserId);

router.post('/send/:rid', protectRoute, sendMessage);

export default router;
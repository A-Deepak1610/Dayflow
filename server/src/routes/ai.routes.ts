import { Router } from 'express';
import { handleAiChat } from '../controllers/ai.controller';

const router = Router();

// POST /api/ai/chat
router.post('/chat', handleAiChat);

export default router;

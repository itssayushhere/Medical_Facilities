import express from 'express';
import { authenticate ,restrict } from "../auth/verifyToken.js";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  createReply,
  // fetch_details
} from '../Controllers/communtiyController.js';

const router = express.Router();
// Routes
router.post('/', createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);
router.post('/:id/reviews', createReply);
// router.get('/profile/me', authenticate, fetch_details);
export default router;

import express from 'express';
import { adminOnly } from '../middleware/auth.js';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryId,
  updateCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', ...adminOnly, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryId);
router.put('/:id', ...adminOnly, updateCategory);
router.delete('/:id', ...adminOnly, deleteCategory);

export default router;

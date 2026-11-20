import express from 'express';
import { adminOnly } from '../middleware/auth.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductId,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', ...adminOnly, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductId);
router.put('/:id', ...adminOnly, updateProduct);
router.delete('/:id', ...adminOnly, deleteProduct);

export default router;

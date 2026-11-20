import express from 'express';
import { adminOnly } from '../middleware/auth.js';
import {
  createProductVariant,
  deleteProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
} from '../controllers/productVariantController.js';

const router = express.Router();

router.post('/', ...adminOnly, createProductVariant);
router.get('/', getAllProductVariants);
router.get('/:id', getProductVariantById);
router.put('/:id', ...adminOnly, updateProductVariant);
router.delete('/:id', ...adminOnly, deleteProductVariant);

export default router;

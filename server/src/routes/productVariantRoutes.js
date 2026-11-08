import express from 'express';
import {
  createProductVariant,
  deleteProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
} from '../controllers/productVariantController.js';

const router = express.Router();

router.post('/', createProductVariant);
router.get('/', getAllProductVariants);
router.get('/:id', getProductVariantById);
router.put('/:id', updateProductVariant);
router.delete('/:id', deleteProductVariant);

export default router;

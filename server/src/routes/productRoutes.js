import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductId,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductId);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

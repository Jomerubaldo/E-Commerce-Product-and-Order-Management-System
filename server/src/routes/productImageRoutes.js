import express from 'express';
import {
  createProductImage,
  deleteProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
} from '../controllers/productImageController.js';

const router = express.Router();

router.post('/', createProductImage);
router.get('/', getAllProductImages);
router.get('/:id', getProductImageById);
router.put('/:id', updateProductImage);
router.delete('/:id', deleteProductImage);

export default router;

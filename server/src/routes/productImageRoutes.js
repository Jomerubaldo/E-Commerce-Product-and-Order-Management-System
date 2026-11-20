import express from 'express';
import upload from '../middleware/upload.js';
import { adminOnly } from '../middleware/auth.js';
import {
  createProductImage,
  deleteProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
} from '../controllers/productImageController.js';

const router = express.Router();

router.post('/', ...adminOnly, upload.single('image'), createProductImage);
router.get('/', getAllProductImages);
router.get('/:id', getProductImageById);
router.put('/:id', ...adminOnly, upload.single('image'), updateProductImage);
router.delete('/:id', ...adminOnly, deleteProductImage);

export default router;

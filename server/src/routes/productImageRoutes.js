import express from 'express';
import upload from '../middleware/upload.js';
import {
  createProductImage,
  deleteProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
} from '../controllers/productImageController.js';

const router = express.Router();

router.post('/', upload.single('image'), createProductImage);
router.get('/', getAllProductImages);
router.get('/:id', getProductImageById);
router.put('/:id', upload.single('image'), updateProductImage);
router.delete('/:id', deleteProductImage);

export default router;

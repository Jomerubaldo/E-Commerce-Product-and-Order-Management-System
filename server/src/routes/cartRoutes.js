import express from 'express';
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/', createCart);
router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;

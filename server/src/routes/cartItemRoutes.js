import express from 'express';
import {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
} from '../controllers/cartItemController.js';

const router = express.Router();

router.post('/', createCartItem);
router.get('/', getAllCartItems);
router.get('/:id', getCartItemById);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

export default router;

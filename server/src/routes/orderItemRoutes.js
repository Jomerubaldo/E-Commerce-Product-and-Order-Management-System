import express from 'express';
import {
  createOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
} from '../controllers/orderItemController.js';

const router = express.Router();

router.post('/', createOrderItem);
router.get('/', getAllOrderItems);
router.get('/:id', getOrderItemById);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

export default router;

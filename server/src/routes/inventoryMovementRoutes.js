import express from 'express';
import {
  createInventoryMovement,
  deleteInventoryMovement,
  getAllInventoryMovements,
  getInventoryMovementById,
  updateInventoryMovement,
} from '../controllers/inventoryMovementController.js';

const router = express.Router();

router.post('/', createInventoryMovement);
router.get('/', getAllInventoryMovements);
router.get('/:id', getInventoryMovementById);
router.put('/:id', updateInventoryMovement);
router.delete('/:id', deleteInventoryMovement);

export default router;

import express from 'express';
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
} from '../controllers/addressController.js';

const router = express.Router();

router.post('/', createAddress);
router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;

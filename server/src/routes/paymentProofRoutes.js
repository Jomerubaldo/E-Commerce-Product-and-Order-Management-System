import express from 'express';
import {
  createPaymentProof,
  deletePaymentProof,
  getAllPaymentProofs,
  getPaymentProofById,
  updatePaymentProof,
} from '../controllers/paymentProofController.js';

const router = express.Router();

router.post('/', createPaymentProof);
router.get('/', getAllPaymentProofs);
router.get('/:id', getPaymentProofById);
router.put('/:id', updatePaymentProof);
router.delete('/:id', deletePaymentProof);

export default router;

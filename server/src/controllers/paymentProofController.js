import { z } from 'zod';
import * as paymentProofService from '../services/paymentProofService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createPaymentProofSchema = z.object({
  paymentId: z.coerce.number().int().positive(),
  imageUrl: z.string().trim().url().max(500),
  publicId: z.string().trim().min(1).max(255),
});

const updatePaymentProofSchema = z
  .object({
    imageUrl: z.string().trim().url().max(500).optional(),
    publicId: z.string().trim().min(1).max(255).optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createPaymentProof = async (req, res) => {
  try {
    const data = createPaymentProofSchema.parse(req.body);
    const proof = await paymentProofService.createPaymentProof(data);

    return res.status(201).json({
      success: true,
      message: 'Payment proof created successfully.',
      data: proof,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllPaymentProofs = async (req, res) => {
  try {
    const proofs = await paymentProofService.getAllPaymentProofs();

    return res.status(200).json({
      success: true,
      message: 'Payment proofs retrieved successfully.',
      data: proofs,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getPaymentProofById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const proof = await paymentProofService.getPaymentProofById(id);

    return res.status(200).json({
      success: true,
      message: 'Payment proof retrieved successfully.',
      data: proof,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updatePaymentProof = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updatePaymentProofSchema.parse(req.body);
    const proof = await paymentProofService.updatePaymentProof(id, data);

    return res.status(200).json({
      success: true,
      message: 'Payment proof updated successfully.',
      data: proof,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deletePaymentProof = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const proof = await paymentProofService.deletePaymentProof(id);

    return res.status(200).json({
      success: true,
      message: 'Payment proof deleted successfully.',
      data: proof,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

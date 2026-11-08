import { z } from 'zod';
import * as paymentService from '../services/paymentService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const paymentMethodSchema = z.enum(['COD', 'GCASH']);

const paymentStatusSchema = z.enum([
  'PENDING',
  'AWAITING_VERIFICATION',
  'VERIFIED',
  'REJECTED',
  'PAID',
  'REFUNDED',
]);

const createPaymentSchema = z.object({
  orderId: z.coerce.number().int().positive(),
  method: paymentMethodSchema,
  status: paymentStatusSchema.optional(),
  amount: z.coerce.number().nonnegative(),
  referenceNumber: z.string().trim().max(100).optional(),
});

const updatePaymentSchema = z
  .object({
    method: paymentMethodSchema.optional(),
    status: paymentStatusSchema.optional(),
    amount: z.coerce.number().nonnegative().optional(),
    referenceNumber: z.string().trim().max(100).nullable().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createPayment = async (req, res) => {
  try {
    const data = createPaymentSchema.parse(req.body);
    const payment = await paymentService.createPayment(data);

    return res.status(201).json({
      success: true,
      message: 'Payment created successfully.',
      data: payment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();

    return res.status(200).json({
      success: true,
      message: 'Payments retrieved successfully.',
      data: payments,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getPaymentById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const payment = await paymentService.getPaymentById(id);

    return res.status(200).json({
      success: true,
      message: 'Payment retrieved successfully.',
      data: payment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updatePayment = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updatePaymentSchema.parse(req.body);
    const payment = await paymentService.updatePayment(id, data);

    return res.status(200).json({
      success: true,
      message: 'Payment updated successfully.',
      data: payment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deletePayment = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const payment = await paymentService.deletePayment(id);

    return res.status(200).json({
      success: true,
      message: 'Payment deleted successfully.',
      data: payment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

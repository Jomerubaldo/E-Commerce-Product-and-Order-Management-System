import { z } from 'zod';
import * as orderService from '../services/orderService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const orderStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
]);

const createOrderSchema = z.object({
  userId: z.coerce.number().int().positive(),
  addressId: z.coerce.number().int().positive().nullable().optional(),
  orderNumber: z.string().trim().min(1).max(50).optional(),
  recipientName: z.string().trim().min(1).max(150),
  recipientPhone: z.string().trim().min(1).max(30),
  addressLine: z.string().trim().min(1).max(255),
  barangay: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  province: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(1).max(20),
  subtotal: z.coerce.number().nonnegative(),
  shippingFee: z.coerce.number().nonnegative().optional(),
  totalAmount: z.coerce.number().nonnegative(),
  status: orderStatusSchema.optional(),
});

const updateOrderSchema = z
  .object({
    addressId: z.coerce.number().int().positive().nullable().optional(),
    recipientName: z.string().trim().min(1).max(150).optional(),
    recipientPhone: z.string().trim().min(1).max(30).optional(),
    addressLine: z.string().trim().min(1).max(255).optional(),
    barangay: z.string().trim().min(1).max(100).optional(),
    city: z.string().trim().min(1).max(100).optional(),
    province: z.string().trim().min(1).max(100).optional(),
    postalCode: z.string().trim().min(1).max(20).optional(),
    subtotal: z.coerce.number().nonnegative().optional(),
    shippingFee: z.coerce.number().nonnegative().optional(),
    totalAmount: z.coerce.number().nonnegative().optional(),
    status: orderStatusSchema.optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createOrder = async (req, res) => {
  try {
    const data = createOrderSchema.parse(req.body);
    const order = await orderService.createOrder(data);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      data: order,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully.',
      data: orders,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getOrderById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const order = await orderService.getOrderById(id);

    return res.status(200).json({
      success: true,
      message: 'Order retrieved successfully.',
      data: order,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateOrder = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateOrderSchema.parse(req.body);
    const order = await orderService.updateOrder(id, data);

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully.',
      data: order,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteOrder = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const order = await orderService.deleteOrder(id);

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully.',
      data: order,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

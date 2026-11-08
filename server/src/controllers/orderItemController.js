import { z } from 'zod';
import * as orderItemService from '../services/orderItemService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createOrderItemSchema = z.object({
  orderId: z.coerce.number().int().positive(),
  variantId: z.coerce.number().int().positive(),
  productName: z.string().trim().min(1).max(191),
  sku: z.string().trim().min(1).max(100),
  size: z.string().trim().min(1).max(30),
  color: z.string().trim().min(1).max(50),
  quantity: z.coerce.number().int().positive(),
  unitPrice: z.coerce.number().nonnegative(),
  lineTotal: z.coerce.number().nonnegative(),
});

const updateOrderItemSchema = z
  .object({
    productName: z.string().trim().min(1).max(191).optional(),
    sku: z.string().trim().min(1).max(100).optional(),
    size: z.string().trim().min(1).max(30).optional(),
    color: z.string().trim().min(1).max(50).optional(),
    quantity: z.coerce.number().int().positive().optional(),
    unitPrice: z.coerce.number().nonnegative().optional(),
    lineTotal: z.coerce.number().nonnegative().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createOrderItem = async (req, res) => {
  try {
    const data = createOrderItemSchema.parse(req.body);
    const orderItem = await orderItemService.createOrderItem(data);

    return res.status(201).json({
      success: true,
      message: 'Order item created successfully.',
      data: orderItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();

    return res.status(200).json({
      success: true,
      message: 'Order items retrieved successfully.',
      data: orderItems,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getOrderItemById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const orderItem = await orderItemService.getOrderItemById(id);

    return res.status(200).json({
      success: true,
      message: 'Order item retrieved successfully.',
      data: orderItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateOrderItem = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateOrderItemSchema.parse(req.body);
    const orderItem = await orderItemService.updateOrderItem(id, data);

    return res.status(200).json({
      success: true,
      message: 'Order item updated successfully.',
      data: orderItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteOrderItem = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const orderItem = await orderItemService.deleteOrderItem(id);

    return res.status(200).json({
      success: true,
      message: 'Order item deleted successfully.',
      data: orderItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

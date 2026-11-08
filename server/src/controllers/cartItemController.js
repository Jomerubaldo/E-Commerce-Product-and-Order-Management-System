import { z } from 'zod';
import * as cartItemService from '../services/cartItemService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createCartItemSchema = z.object({
  cartId: z.coerce.number().int().positive(),
  variantId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive().optional(),
});

const updateCartItemSchema = z
  .object({
    variantId: z.coerce.number().int().positive().optional(),
    quantity: z.coerce.number().int().positive().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createCartItem = async (req, res) => {
  try {
    const data = createCartItemSchema.parse(req.body);
    const cartItem = await cartItemService.createCartItem(data);

    return res.status(201).json({
      success: true,
      message: 'Cart item created successfully.',
      data: cartItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await cartItemService.getAllCartItems();

    return res.status(200).json({
      success: true,
      message: 'Cart items retrieved successfully.',
      data: cartItems,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getCartItemById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const cartItem = await cartItemService.getCartItemById(id);

    return res.status(200).json({
      success: true,
      message: 'Cart item retrieved successfully.',
      data: cartItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateCartItem = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateCartItemSchema.parse(req.body);
    const cartItem = await cartItemService.updateCartItem(id, data);

    return res.status(200).json({
      success: true,
      message: 'Cart item updated successfully.',
      data: cartItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteCartItem = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const cartItem = await cartItemService.deleteCartItem(id);

    return res.status(200).json({
      success: true,
      message: 'Cart item deleted successfully.',
      data: cartItem,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

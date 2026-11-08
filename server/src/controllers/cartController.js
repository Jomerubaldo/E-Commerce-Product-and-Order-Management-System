import { z } from 'zod';
import * as cartService from '../services/cartService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createCartSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

const updateCartSchema = z
  .object({
    userId: z.coerce.number().int().positive().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createCart = async (req, res) => {
  try {
    const data = createCartSchema.parse(req.body);
    const cart = await cartService.createCart(data);

    return res.status(201).json({
      success: true,
      message: 'Cart created successfully.',
      data: cart,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();

    return res.status(200).json({
      success: true,
      message: 'Carts retrieved successfully.',
      data: carts,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getCartById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const cart = await cartService.getCartById(id);

    return res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully.',
      data: cart,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateCart = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateCartSchema.parse(req.body);
    const cart = await cartService.updateCart(id, data);

    return res.status(200).json({
      success: true,
      message: 'Cart updated successfully.',
      data: cart,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteCart = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const cart = await cartService.deleteCart(id);

    return res.status(200).json({
      success: true,
      message: 'Cart deleted successfully.',
      data: cart,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

import { z } from 'zod';
import * as productVariantService from '../services/productVariantService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createProductVariantSchema = z.object({
  productId: z.coerce.number().int().positive(),
  sku: z.string().trim().min(1).max(100),
  size: z.string().trim().min(1).max(30),
  color: z.string().trim().min(1).max(50),
  stock: z.coerce.number().int().min(0).optional(),
  priceOverride: z.coerce.number().nonnegative().nullable().optional(),
});

const updateProductVariantSchema = z
  .object({
    sku: z.string().trim().min(1).max(100).optional(),
    size: z.string().trim().min(1).max(30).optional(),
    color: z.string().trim().min(1).max(50).optional(),
    stock: z.coerce.number().int().min(0).optional(),
    priceOverride: z.coerce.number().nonnegative().nullable().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createProductVariant = async (req, res) => {
  try {
    const data = createProductVariantSchema.parse(req.body);
    const variant = await productVariantService.createProductVariant(data);

    return res.status(201).json({
      success: true,
      message: 'Product variant created successfully.',
      data: variant,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllProductVariants = async (req, res) => {
  try {
    const variants = await productVariantService.getAllProductVariants();

    return res.status(200).json({
      success: true,
      message: 'Product variants retrieved successfully.',
      data: variants,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductVariantById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const variant = await productVariantService.getProductVariantById(id);

    return res.status(200).json({
      success: true,
      message: 'Product variant retrieved successfully.',
      data: variant,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateProductVariant = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateProductVariantSchema.parse(req.body);
    const variant = await productVariantService.updateProductVariant(id, data);

    return res.status(200).json({
      success: true,
      message: 'Product variant updated successfully.',
      data: variant,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProductVariant = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const variant = await productVariantService.deleteProductVariant(id);

    return res.status(200).json({
      success: true,
      message: 'Product variant deleted successfully.',
      data: variant,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

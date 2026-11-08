import { z } from 'zod';
import * as productService from '../services/productService.js';
import { handleError, hasAtLeastOneField, idSchema, parseIdParam } from '../utils/helpers.js';

const productStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']);

const createProductSchema = z.object({
  categoryId: z.coerce.number().int().positive().optional(),
  name: z.string().trim().min(1).max(191),
  slug: z.string().trim().min(1).max(220).optional(),
  description: z.string().trim().optional(),
  price: z.coerce.number().nonnegative(),
  status: productStatusSchema.optional(),
});

const updateProductSchema = z
  .object({
    categoryId: z.coerce.number().int().positive().optional(),
    name: z.string().trim().min(1).max(191).optional(),
    slug: z.string().trim().min(1).max(220).optional(),
    description: z.string().trim().nullable().optional(),
    price: z.coerce.number().nonnegative().optional(),
    status: productStatusSchema.optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createProduct = async (req, res) => {
  try {
    const data = createProductSchema.parse(req.body);
    const categoryId = idSchema.parse(req.params.id ?? data.categoryId);

    const product = await productService.createProduct({
      ...data,
      categoryId,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: products,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductId = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const product = await productService.getProductById(id);

    return res.status(200).json({
      success: true,
      message: 'Product retrieved successfully.',
      data: product,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(id, data);

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: product,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const product = await productService.deleteProduct(id);

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
      data: product,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

import { z } from 'zod';
import * as productImageService from '../services/productImageService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createProductImageSchema = z.object({
  productId: z.coerce.number().int().positive(),
  imageUrl: z.string().trim().url().max(500),
  publicId: z.string().trim().min(1).max(255),
  altText: z.string().trim().max(191).optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const updateProductImageSchema = z
  .object({
    imageUrl: z.string().trim().url().max(500).optional(),
    publicId: z.string().trim().min(1).max(255).optional(),
    altText: z.string().trim().max(191).nullable().optional(),
    isPrimary: z.boolean().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createProductImage = async (req, res) => {
  try {
    const data = createProductImageSchema.parse(req.body);
    const image = await productImageService.createProductImage(data);

    return res.status(201).json({
      success: true,
      message: 'Product image created successfully.',
      data: image,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllProductImages = async (req, res) => {
  try {
    const images = await productImageService.getAllProductImages();

    return res.status(200).json({
      success: true,
      message: 'Product images retrieved successfully.',
      data: images,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductImageById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const image = await productImageService.getProductImageById(id);

    return res.status(200).json({
      success: true,
      message: 'Product image retrieved successfully.',
      data: image,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateProductImage = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateProductImageSchema.parse(req.body);
    const image = await productImageService.updateProductImage(id, data);

    return res.status(200).json({
      success: true,
      message: 'Product image updated successfully.',
      data: image,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProductImage = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const image = await productImageService.deleteProductImage(id);

    return res.status(200).json({
      success: true,
      message: 'Product image deleted successfully.',
      data: image,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

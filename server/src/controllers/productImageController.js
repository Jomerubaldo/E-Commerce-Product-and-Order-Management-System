import { z } from 'zod';
import * as productImageService from '../services/productImageService.js';
import { deleteImage, uploadBuffer } from '../services/cloudinaryService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const booleanField = z.preprocess((value) => {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return value;
}, z.boolean());

const createProductImageSchema = z.object({
  productId: z.coerce.number().int().positive(),
  altText: z.string().trim().max(191).optional(),
  isPrimary: booleanField.optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const updateProductImageSchema = z.object({
  altText: z.string().trim().max(191).nullable().optional(),
  isPrimary: booleanField.optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const createProductImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message:
        'Image file is required. Send multipart/form-data with field name "image".',
    });
  }

  let uploaded = null;

  try {
    const data = createProductImageSchema.parse(req.body);
    uploaded = await uploadBuffer(req.file.buffer);

    const image = await productImageService.createProductImage({
      ...data,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
    });

    return res.status(201).json({
      success: true,
      message: 'Product image created successfully.',
      data: image,
    });
  } catch (error) {
    if (uploaded) {
      try {
        await deleteImage(uploaded.public_id);
      } catch (cleanupError) {
        console.error('Failed to clean up Cloudinary image:', cleanupError);
      }
    }

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

  let uploaded = null;

  try {
    const existing = await productImageService.getProductImageById(id);
    const data = updateProductImageSchema.parse(req.body);

    if (!req.file && !hasAtLeastOneField(data)) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one field or an image file to update.',
      });
    }

    if (req.file) {
      uploaded = await uploadBuffer(req.file.buffer);
      data.imageUrl = uploaded.secure_url;
      data.publicId = uploaded.public_id;
    }

    const image = await productImageService.updateProductImage(id, data);

    if (uploaded && existing.publicId && existing.publicId !== uploaded.public_id) {
      try {
        await deleteImage(existing.publicId);
      } catch (cleanupError) {
        console.error('Failed to delete old Cloudinary image:', cleanupError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Product image updated successfully.',
      data: image,
    });
  } catch (error) {
    if (uploaded) {
      try {
        await deleteImage(uploaded.public_id);
      } catch (cleanupError) {
        console.error('Failed to clean up Cloudinary image:', cleanupError);
      }
    }

    return handleError(res, error);
  }
};

export const deleteProductImage = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const image = await productImageService.deleteProductImage(id);

    if (image?.publicId) {
      try {
        await deleteImage(image.publicId);
      } catch (cleanupError) {
        console.error('Failed to delete Cloudinary image:', cleanupError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Product image deleted successfully.',
      data: image,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

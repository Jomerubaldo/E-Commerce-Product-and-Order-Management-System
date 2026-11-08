import { z } from 'zod';
import * as categoryService from '../services/categoryService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(100),
  slug: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    slug: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createCategory = async (req, res) => {
  try {
    const data = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(data);

    return res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: category,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully.',
      data: categories,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getCategoryId = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const category = await categoryService.getCategoryById(id);

    return res.status(200).json({
      success: true,
      message: 'Category retrieved successfully.',
      data: category,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateCategory = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(id, data);

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully.',
      data: category,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const category = await categoryService.deleteCategory(id);

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully.',
      data: category,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

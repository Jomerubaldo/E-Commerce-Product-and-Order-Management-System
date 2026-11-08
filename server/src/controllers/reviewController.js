import { z } from 'zod';
import * as reviewService from '../services/reviewService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createReviewSchema = z.object({
  userId: z.coerce.number().int().positive(),
  productId: z.coerce.number().int().positive(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().optional(),
});

const updateReviewSchema = z
  .object({
    rating: z.coerce.number().int().min(1).max(5).optional(),
    comment: z.string().trim().nullable().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createReview = async (req, res) => {
  try {
    const data = createReviewSchema.parse(req.body);
    const review = await reviewService.createReview(data);

    return res.status(201).json({
      success: true,
      message: 'Review created successfully.',
      data: review,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();

    return res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully.',
      data: reviews,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getReviewById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const review = await reviewService.getReviewById(id);

    return res.status(200).json({
      success: true,
      message: 'Review retrieved successfully.',
      data: review,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateReview = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateReviewSchema.parse(req.body);
    const review = await reviewService.updateReview(id, data);

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully.',
      data: review,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteReview = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const review = await reviewService.deleteReview(id);

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully.',
      data: review,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

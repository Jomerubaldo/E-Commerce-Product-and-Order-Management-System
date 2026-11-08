import { z } from 'zod';
import * as inventoryMovementService from '../services/inventoryMovementService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const movementTypeSchema = z.enum([
  'STOCK_IN',
  'STOCK_OUT',
  'ADJUSTMENT',
  'SALE',
  'RETURN',
]);

const createInventoryMovementSchema = z.object({
  variantId: z.coerce.number().int().positive(),
  actorId: z.coerce.number().int().positive().nullable().optional(),
  type: movementTypeSchema,
  quantity: z.coerce.number().int().positive(),
  reason: z.string().trim().max(255).optional(),
});

const updateInventoryMovementSchema = z
  .object({
    actorId: z.coerce.number().int().positive().nullable().optional(),
    type: movementTypeSchema.optional(),
    quantity: z.coerce.number().int().positive().optional(),
    reason: z.string().trim().max(255).nullable().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createInventoryMovement = async (req, res) => {
  try {
    const data = createInventoryMovementSchema.parse(req.body);
    const movement = await inventoryMovementService.createInventoryMovement(data);

    return res.status(201).json({
      success: true,
      message: 'Inventory movement created successfully.',
      data: movement,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllInventoryMovements = async (req, res) => {
  try {
    const movements = await inventoryMovementService.getAllInventoryMovements();

    return res.status(200).json({
      success: true,
      message: 'Inventory movements retrieved successfully.',
      data: movements,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getInventoryMovementById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const movement = await inventoryMovementService.getInventoryMovementById(id);

    return res.status(200).json({
      success: true,
      message: 'Inventory movement retrieved successfully.',
      data: movement,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateInventoryMovement = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateInventoryMovementSchema.parse(req.body);
    const movement = await inventoryMovementService.updateInventoryMovement(id, data);

    return res.status(200).json({
      success: true,
      message: 'Inventory movement updated successfully.',
      data: movement,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteInventoryMovement = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const movement = await inventoryMovementService.deleteInventoryMovement(id);

    return res.status(200).json({
      success: true,
      message: 'Inventory movement deleted successfully.',
      data: movement,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

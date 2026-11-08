import { z } from 'zod';
import * as userService from '../services/userService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const passwordSchema = z.string().min(8).max(72);

const createUserSchema = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(191),
  password: passwordSchema,
  phone: z.string().trim().max(30).optional(),
  role: z.enum(['CUSTOMER', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    email: z.string().trim().email().max(191).optional(),
    password: passwordSchema.optional(),
    phone: z.string().trim().max(30).nullable().optional(),
    role: z.enum(['CUSTOMER', 'ADMIN']).optional(),
    isActive: z.boolean().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createUser = async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await userService.createUser(data);

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: user,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: users,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getUserById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const user = await userService.getUserById(id);

    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: user,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateUser = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(id, data);

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: user,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const user = await userService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
      data: user,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

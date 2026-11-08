import { z } from 'zod';
import * as addressService from '../services/addressService.js';
import { handleError, hasAtLeastOneField, parseIdParam } from '../utils/helpers.js';

const createAddressSchema = z.object({
  userId: z.coerce.number().int().positive(),
  label: z.string().trim().max(50).optional(),
  recipientName: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(1).max(30),
  addressLine: z.string().trim().min(1).max(255),
  barangay: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  province: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(1).max(20),
  isDefault: z.boolean().optional(),
});

const updateAddressSchema = z
  .object({
    label: z.string().trim().max(50).nullable().optional(),
    recipientName: z.string().trim().min(1).max(150).optional(),
    phone: z.string().trim().min(1).max(30).optional(),
    addressLine: z.string().trim().min(1).max(255).optional(),
    barangay: z.string().trim().min(1).max(100).optional(),
    city: z.string().trim().min(1).max(100).optional(),
    province: z.string().trim().min(1).max(100).optional(),
    postalCode: z.string().trim().min(1).max(20).optional(),
    isDefault: z.boolean().optional(),
  })
  .refine(hasAtLeastOneField, {
    message: 'Provide at least one field to update.',
  });

export const createAddress = async (req, res) => {
  try {
    const data = createAddressSchema.parse(req.body);
    const address = await addressService.createAddress(data);

    return res.status(201).json({
      success: true,
      message: 'Address created successfully.',
      data: address,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getAllAddresses();

    return res.status(200).json({
      success: true,
      message: 'Addresses retrieved successfully.',
      data: addresses,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAddressById = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const address = await addressService.getAddressById(id);

    return res.status(200).json({
      success: true,
      message: 'Address retrieved successfully.',
      data: address,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateAddress = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const data = updateAddressSchema.parse(req.body);
    const address = await addressService.updateAddress(id, data);

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully.',
      data: address,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteAddress = async (req, res) => {
  const id = parseIdParam(req, res);
  if (id === null) return;

  try {
    const address = await addressService.deleteAddress(id);

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully.',
      data: address,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

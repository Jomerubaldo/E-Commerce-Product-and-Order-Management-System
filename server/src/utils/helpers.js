import { z } from 'zod';

export const idSchema = z.coerce.number().int().positive();

export const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const hasAtLeastOneField = (data) => Object.keys(data).length > 0;

export const sendZodError = (res, error) =>
  res.status(400).json({
    success: false,
    message: 'Validation failed.',
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    })),
  });

export const parseIdParam = (req, res) => {
  const result = idSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: result.error.issues.map((issue) => ({
        field: 'id',
        message: issue.message,
      })),
    });
    return null;
  }

  return result.data;
};

export const handleError = (res, error) => {
  if (error instanceof z.ZodError) {
    return sendZodError(res, error);
  }

  switch (error?.code) {
    case 'P2002':
      return res.status(409).json({
        success: false,
        message: 'Duplicate value for a unique field.',
        fields: error.meta?.target,
      });
    case 'P2003':
      return res.status(400).json({
        success: false,
        message:
          'Related record does not exist or is still referenced by another record.',
      });
    case 'P2025':
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    default:
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
  }
};

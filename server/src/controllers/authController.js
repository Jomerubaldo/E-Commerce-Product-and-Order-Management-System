import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/jwt.js';
import * as authService from '../services/authService.js';
import { handleError } from '../utils/helpers.js';

const loginSchema = z.object({
  email: z.string().trim().email().max(191),
  password: z.string().min(1).max(72),
});

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await authService.validateCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { token, user },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getMe = (req, res) =>
  res.status(200).json({
    success: true,
    message: 'Authenticated user retrieved successfully.',
    data: req.user,
  });

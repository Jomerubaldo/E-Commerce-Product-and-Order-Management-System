import bcrypt from 'bcrypt';
import { prisma } from '../config/database.js';

export const validateCredentials = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isActive) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;

  return safeUser;
};

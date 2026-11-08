import bcrypt from 'bcrypt';
import { prisma } from '../config/database.js';

const SALT_ROUNDS = 10;

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export const createUser = async (data) => {
  const { password, ...rest } = data;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { ...rest, passwordHash },
    select: publicUserSelect,
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: publicUserSelect,
    orderBy: { createdAt: 'desc' },
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      ...publicUserSelect,
      addresses: true,
      cart: { include: { items: true } },
    },
  });
};

export const updateUser = async (id, data) => {
  const { password, ...rest } = data;
  const updateData = { ...rest };

  if (password) {
    updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: publicUserSelect,
  });
};

export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
    select: publicUserSelect,
  });
};

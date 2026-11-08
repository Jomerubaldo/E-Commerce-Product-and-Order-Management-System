import { prisma } from '../config/database.js';

const cartInclude = {
  user: { select: { id: true, name: true, email: true } },
  items: {
    include: {
      variant: { include: { product: true } },
    },
  },
};

export const createCart = async (data) => {
  return prisma.cart.create({ data, include: cartInclude });
};

export const getAllCarts = async () => {
  return prisma.cart.findMany({
    include: cartInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getCartById = async (id) => {
  return prisma.cart.findUniqueOrThrow({
    where: { id },
    include: cartInclude,
  });
};

export const updateCart = async (id, data) => {
  return prisma.cart.update({
    where: { id },
    data,
    include: cartInclude,
  });
};

export const deleteCart = async (id) => {
  return prisma.cart.delete({ where: { id } });
};

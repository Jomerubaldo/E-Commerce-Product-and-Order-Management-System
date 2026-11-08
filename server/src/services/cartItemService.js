import { prisma } from '../config/database.js';

const cartItemInclude = {
  variant: { include: { product: true } },
};

export const createCartItem = async (data) => {
  return prisma.cartItem.create({
    data,
    include: cartItemInclude,
  });
};

export const getAllCartItems = async () => {
  return prisma.cartItem.findMany({
    include: cartItemInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getCartItemById = async (id) => {
  return prisma.cartItem.findUniqueOrThrow({
    where: { id },
    include: cartItemInclude,
  });
};

export const updateCartItem = async (id, data) => {
  return prisma.cartItem.update({
    where: { id },
    data,
    include: cartItemInclude,
  });
};

export const deleteCartItem = async (id) => {
  return prisma.cartItem.delete({ where: { id } });
};

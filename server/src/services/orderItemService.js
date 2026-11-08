import { prisma } from '../config/database.js';

const orderItemInclude = {
  order: { select: { id: true, orderNumber: true, status: true } },
  variant: { include: { product: true } },
};

export const createOrderItem = async (data) => {
  return prisma.orderItem.create({
    data,
    include: orderItemInclude,
  });
};

export const getAllOrderItems = async () => {
  return prisma.orderItem.findMany({
    include: orderItemInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getOrderItemById = async (id) => {
  return prisma.orderItem.findUniqueOrThrow({
    where: { id },
    include: orderItemInclude,
  });
};

export const updateOrderItem = async (id, data) => {
  return prisma.orderItem.update({
    where: { id },
    data,
    include: orderItemInclude,
  });
};

export const deleteOrderItem = async (id) => {
  return prisma.orderItem.delete({ where: { id } });
};

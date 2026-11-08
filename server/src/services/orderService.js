import { prisma } from '../config/database.js';

const orderInclude = {
  user: { select: { id: true, name: true, email: true } },
  address: true,
  items: {
    include: {
      variant: { include: { product: true } },
    },
  },
  payment: {
    include: { proofs: true },
  },
};

const generateOrderNumber = () =>
  `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;

export const createOrder = async (data) => {
  return prisma.order.create({
    data: {
      ...data,
      orderNumber: data.orderNumber ?? generateOrderNumber(),
    },
    include: orderInclude,
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: orderInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getOrderById = async (id) => {
  return prisma.order.findUniqueOrThrow({
    where: { id },
    include: orderInclude,
  });
};

export const updateOrder = async (id, data) => {
  return prisma.order.update({
    where: { id },
    data,
    include: orderInclude,
  });
};

export const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { id } });
};

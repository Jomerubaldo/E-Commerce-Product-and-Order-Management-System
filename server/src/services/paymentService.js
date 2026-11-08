import { prisma } from '../config/database.js';

const paymentInclude = {
  order: {
    select: { id: true, orderNumber: true, totalAmount: true, status: true },
  },
  proofs: true,
};

export const createPayment = async (data) => {
  return prisma.payment.create({ data, include: paymentInclude });
};

export const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: paymentInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getPaymentById = async (id) => {
  return prisma.payment.findUniqueOrThrow({
    where: { id },
    include: paymentInclude,
  });
};

export const updatePayment = async (id, data) => {
  return prisma.payment.update({
    where: { id },
    data,
    include: paymentInclude,
  });
};

export const deletePayment = async (id) => {
  return prisma.payment.delete({ where: { id } });
};

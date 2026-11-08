import { prisma } from '../config/database.js';

const paymentProofInclude = {
  payment: {
    select: { id: true, orderId: true, method: true, status: true },
  },
};

export const createPaymentProof = async (data) => {
  return prisma.paymentProof.create({
    data,
    include: paymentProofInclude,
  });
};

export const getAllPaymentProofs = async () => {
  return prisma.paymentProof.findMany({
    include: paymentProofInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getPaymentProofById = async (id) => {
  return prisma.paymentProof.findUniqueOrThrow({
    where: { id },
    include: paymentProofInclude,
  });
};

export const updatePaymentProof = async (id, data) => {
  return prisma.paymentProof.update({
    where: { id },
    data,
    include: paymentProofInclude,
  });
};

export const deletePaymentProof = async (id) => {
  return prisma.paymentProof.delete({ where: { id } });
};

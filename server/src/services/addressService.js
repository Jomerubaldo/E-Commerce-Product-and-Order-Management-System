import { prisma } from '../config/database.js';

const addressInclude = {
  user: { select: { id: true, name: true, email: true } },
};

export const createAddress = async (data) => {
  return prisma.$transaction(async (tx) => {
    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId: data.userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return tx.address.create({ data, include: addressInclude });
  });
};

export const getAllAddresses = async () => {
  return prisma.address.findMany({
    include: addressInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getAddressById = async (id) => {
  return prisma.address.findUniqueOrThrow({
    where: { id },
    include: addressInclude,
  });
};

export const updateAddress = async (id, data) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.address.findUniqueOrThrow({ where: { id } });

    if (data.isDefault === true) {
      await tx.address.updateMany({
        where: { userId: existing.userId, isDefault: true, NOT: { id } },
        data: { isDefault: false },
      });
    }

    return tx.address.update({
      where: { id },
      data,
      include: addressInclude,
    });
  });
};

export const deleteAddress = async (id) => {
  return prisma.address.delete({ where: { id } });
};

import { prisma } from '../config/database.js';

const inventoryMovementInclude = {
  variant: { include: { product: true } },
  actor: { select: { id: true, name: true, email: true } },
};

export const createInventoryMovement = async (data) => {
  return prisma.inventoryMovement.create({
    data,
    include: inventoryMovementInclude,
  });
};

export const getAllInventoryMovements = async () => {
  return prisma.inventoryMovement.findMany({
    include: inventoryMovementInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getInventoryMovementById = async (id) => {
  return prisma.inventoryMovement.findUniqueOrThrow({
    where: { id },
    include: inventoryMovementInclude,
  });
};

export const updateInventoryMovement = async (id, data) => {
  return prisma.inventoryMovement.update({
    where: { id },
    data,
    include: inventoryMovementInclude,
  });
};

export const deleteInventoryMovement = async (id) => {
  return prisma.inventoryMovement.delete({ where: { id } });
};

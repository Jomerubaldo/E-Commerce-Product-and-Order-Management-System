import { prisma } from '../config/database.js';

const productImageInclude = {
  product: { select: { id: true, name: true, slug: true } },
};

export const createProductImage = async (data) => {
  return prisma.$transaction(async (tx) => {
    if (data.isPrimary) {
      await tx.productImage.updateMany({
        where: { productId: data.productId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return tx.productImage.create({
      data,
      include: productImageInclude,
    });
  });
};

export const getAllProductImages = async () => {
  return prisma.productImage.findMany({
    include: productImageInclude,
    orderBy: [{ productId: 'asc' }, { sortOrder: 'asc' }],
  });
};

export const getProductImageById = async (id) => {
  return prisma.productImage.findUniqueOrThrow({
    where: { id },
    include: productImageInclude,
  });
};

export const updateProductImage = async (id, data) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.productImage.findUniqueOrThrow({ where: { id } });

    if (data.isPrimary === true) {
      await tx.productImage.updateMany({
        where: { productId: existing.productId, isPrimary: true, NOT: { id } },
        data: { isPrimary: false },
      });
    }

    return tx.productImage.update({
      where: { id },
      data,
      include: productImageInclude,
    });
  });
};

export const deleteProductImage = async (id) => {
  return prisma.productImage.delete({ where: { id } });
};

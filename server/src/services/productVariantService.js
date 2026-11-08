import { prisma } from '../config/database.js';

const productVariantInclude = {
  product: { select: { id: true, name: true, slug: true } },
};

export const createProductVariant = async (data) => {
  return prisma.productVariant.create({
    data,
    include: productVariantInclude,
  });
};

export const getAllProductVariants = async () => {
  return prisma.productVariant.findMany({
    include: productVariantInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getProductVariantById = async (id) => {
  return prisma.productVariant.findUniqueOrThrow({
    where: { id },
    include: productVariantInclude,
  });
};

export const updateProductVariant = async (id, data) => {
  return prisma.productVariant.update({
    where: { id },
    data,
    include: productVariantInclude,
  });
};

export const deleteProductVariant = async (id) => {
  return prisma.productVariant.delete({ where: { id } });
};

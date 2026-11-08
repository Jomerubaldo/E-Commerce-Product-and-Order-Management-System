import { prisma } from '../config/database.js';
import { slugify } from '../utils/helpers.js';

const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: 'asc' } },
  variants: true,
  _count: { select: { reviews: true } },
};

export const createProduct = async (data) => {
  return prisma.product.create({
    data: {
      ...data,
      slug: data.slug ?? slugify(data.name),
    },
    include: productInclude,
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: productInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getProductById = async (id) => {
  return prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      ...productInclude,
      reviews: {
        include: {
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};

export const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
    include: productInclude,
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id } });
};

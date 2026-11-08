import { prisma } from '../config/database.js';
import { slugify } from '../utils/helpers.js';

export const createCategory = async (data) => {
  return prisma.category.create({
    data: {
      ...data,
      slug: data.slug ?? slugify(data.name),
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getCategoryById = async (id) => {
  return prisma.category.findUniqueOrThrow({
    where: { id },
    include: { products: true },
  });
};

export const updateCategory = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id) => {
  return prisma.category.delete({ where: { id } });
};

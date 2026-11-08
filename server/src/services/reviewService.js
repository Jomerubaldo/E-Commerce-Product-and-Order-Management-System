import { prisma } from '../config/database.js';

const reviewInclude = {
  user: { select: { id: true, name: true } },
  product: { select: { id: true, name: true, slug: true } },
};

export const createReview = async (data) => {
  return prisma.review.create({
    data,
    include: reviewInclude,
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    include: reviewInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getReviewById = async (id) => {
  return prisma.review.findUniqueOrThrow({
    where: { id },
    include: reviewInclude,
  });
};

export const updateReview = async (id, data) => {
  return prisma.review.update({
    where: { id },
    data,
    include: reviewInclude,
  });
};

export const deleteReview = async (id) => {
  return prisma.review.delete({ where: { id } });
};

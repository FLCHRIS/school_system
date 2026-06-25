import { PaginationMeta } from "@/types/api.types";

export const getPagination = (page: number = 1, size: number = 10) => {
  const take = size;
  const skip = (page - 1) * size;

  return { take, skip };
};

export const buildPaginationMeta = (
  total: number,
  page: number,
  size: number
): PaginationMeta => {
  return {
    page,
    total,
    limit: size,
    totalPages: Math.ceil(total / size),
  };
};

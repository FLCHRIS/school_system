export const catalogSelectAll = {
  catalogId: true,
  name: true,
  type: true,
  items: {
    select: {
      catalogItemId: true,
      name: true,
      isActive: true,
    },
  },
};

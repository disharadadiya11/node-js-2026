module.exports.paginate = ({ page = 1, limit = 10, totalItems = 0 }) => {
  const currentPage = Math.max(parseInt(page) || 1, 1);
  const perPage = Math.max(parseInt(limit) || 10, 1);

  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const skip = (currentPage - 1) * perPage;

  return {
    skip,
    limit: perPage,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      perPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};

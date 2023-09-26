export const getPagingData = (total, page, limit) => {
  const currentPage = +page;
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage,
    totalPages,
  };
};

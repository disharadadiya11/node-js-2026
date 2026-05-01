module.exports.successResponse = (
  statusCode,
  error,
  message,
  data,
  pagination = null,
) => {
  const response = {
    statusCode,
    error,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }
  return response;
};

module.exports.errorResponse = (statusCode, error, message, data) => {
  return (response = {
    statusCode,
    error,
    message,
    data,
  });
};

const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

const errorResponse = (res, message, statusCode = 500, error = null) => {
  const response = {
    success: false,
    message
  };
  
  // Tampilkan detail error hanya di development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message || error;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse
};
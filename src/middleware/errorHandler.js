const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Token tidak valid', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token sudah kadaluarsa', 401);
  }
  
  // Multer Error (File Upload)
  if (err.name === 'MulterError') {
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }
  
  // Default Error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';
  
  return errorResponse(res, message, statusCode, err);
};

module.exports = errorHandler;
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authenticate = async (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Token tidak ditemukan', 401);
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan data user ke request
    req.admin = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Token tidak valid', 401);
    }
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token sudah kadaluarsa', 401);
    }
    return errorResponse(res, 'Autentikasi gagal', 401, error);
  }
};

module.exports = authenticate;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');
const { successResponse, errorResponse } = require('../utils/response');

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      
      // Validasi input
      if (!username || !password) {
        return errorResponse(res, 'Username dan password harus diisi', 400);
      }
      
      // Cari admin berdasarkan username
      const admin = await AdminModel.findByUsername(username);
      
      if (!admin) {
        return errorResponse(res, 'Username atau password salah', 401);
      }
      
      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (!isPasswordValid) {
        return errorResponse(res, 'Username atau password salah', 401);
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // Response sukses
      return successResponse(res, 'Login berhasil', {
        token,
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
      
    } catch (error) {
      next(error);
    }
  },
  
  logout: async (req, res) => {
    // Logout dilakukan di client side dengan menghapus token
    return successResponse(res, 'Logout berhasil');
  }
};

module.exports = AuthController;
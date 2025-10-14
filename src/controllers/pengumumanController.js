const PengumumanModel = require('../models/pengumumanModel');
const { successResponse, errorResponse } = require('../utils/response');

const PengumumanController = {
  getAll: async (req, res, next) => {
    try {
      const pengumuman = await PengumumanModel.getAll();
      return successResponse(res, 'Data pengumuman berhasil diambil', pengumuman);
    } catch (error) {
      next(error);
    }
  },
  
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const pengumuman = await PengumumanModel.getById(id);
      
      if (!pengumuman) {
        return errorResponse(res, 'Pengumuman tidak ditemukan', 404);
      }
      
      return successResponse(res, 'Data pengumuman berhasil diambil', pengumuman);
    } catch (error) {
      next(error);
    }
  },
  
  create: async (req, res, next) => {
    try {
      const { judul, deskripsi } = req.body;
      
      // Validasi
      if (!judul) {
        return errorResponse(res, 'Judul harus diisi', 400);
      }
      
      const pengumumanData = {
        judul,
        deskripsi: deskripsi || null
      };
      
      const pengumuman = await PengumumanModel.create(pengumumanData);
      return successResponse(res, 'Pengumuman berhasil dibuat', pengumuman, 201);
    } catch (error) {
      next(error);
    }
  },
  
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul, deskripsi } = req.body;
      
      // Cek apakah pengumuman ada
      const existingPengumuman = await PengumumanModel.getById(id);
      if (!existingPengumuman) {
        return errorResponse(res, 'Pengumuman tidak ditemukan', 404);
      }
      
      // Validasi
      if (!judul) {
        return errorResponse(res, 'Judul harus diisi', 400);
      }
      
      const pengumumanData = {
        judul,
        deskripsi: deskripsi || null
      };
      
      const pengumuman = await PengumumanModel.update(id, pengumumanData);
      return successResponse(res, 'Pengumuman berhasil diupdate', pengumuman);
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Cek apakah pengumuman ada
      const existingPengumuman = await PengumumanModel.getById(id);
      if (!existingPengumuman) {
        return errorResponse(res, 'Pengumuman tidak ditemukan', 404);
      }
      
      await PengumumanModel.delete(id);
      return successResponse(res, 'Pengumuman berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = PengumumanController;
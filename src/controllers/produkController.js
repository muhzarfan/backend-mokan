const multer = require('multer');
const ProdukModel = require('../models/produkModel');
const { successResponse, errorResponse } = require('../utils/response');

// Konfigurasi multer untuk upload gambar
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // maks 5mb
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipe file tidak diizinkan. Hanya JPG, PNG, dan WEBP'));
    }
  }
});

const ProdukController = {
  upload: upload.single('gambar'),
  
  getAll: async (req, res, next) => {
    try {
      const produk = await ProdukModel.getAll();
      return successResponse(res, 'Data produk berhasil diambil', produk);
    } catch (error) {
      next(error);
    }
  },
  
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const produk = await ProdukModel.getById(id);
      
      if (!produk) {
        return errorResponse(res, 'Produk tidak ditemukan', 404);
      }
      
      return successResponse(res, 'Data produk berhasil diambil', produk);
    } catch (error) {
      next(error);
    }
  },
  
  create: async (req, res, next) => {
    try {
      const { nama, harga, deskripsi } = req.body;
      
      // Validasi
      if (!nama || !harga) {
        return errorResponse(res, 'Nama dan harga harus diisi', 400);
      }
      
      if (isNaN(harga) || parseInt(harga) < 0) {
        return errorResponse(res, 'Harga harus berupa angka positif', 400);
      }
      
      let gambarUrl = null;
      
      // Upload gambar jika ada
      if (req.file) {
        gambarUrl = await ProdukModel.uploadImage(req.file);
      }
      
      const produkData = {
        nama,
        harga: parseInt(harga),
        gambar: gambarUrl,
        deskripsi: deskripsi || null
      };
      
      const produk = await ProdukModel.create(produkData);
      return successResponse(res, 'Produk berhasil dibuat', produk, 201);
    } catch (error) {
      next(error);
    }
  },
  
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama, harga, deskripsi } = req.body;
      
      // Cek apakah produk ada
      const existingProduk = await ProdukModel.getById(id);
      if (!existingProduk) {
        return errorResponse(res, 'Produk tidak ditemukan', 404);
      }
      
      // Validasi
      if (!nama || !harga) {
        return errorResponse(res, 'Nama dan harga harus diisi', 400);
      }
      
      if (isNaN(harga) || parseInt(harga) < 0) {
        return errorResponse(res, 'Harga harus berupa angka positif', 400);
      }
      
      let gambarUrl = existingProduk.gambar;
      
      // Upload gambar baru jika ada
      if (req.file) {
        // Hapus gambar lama jika ada
        if (existingProduk.gambar) {
          await ProdukModel.deleteImage(existingProduk.gambar);
        }
        gambarUrl = await ProdukModel.uploadImage(req.file);
      }
      
      const produkData = {
        nama,
        harga: parseInt(harga),
        gambar: gambarUrl,
        deskripsi: deskripsi || null
      };
      
      const produk = await ProdukModel.update(id, produkData);
      return successResponse(res, 'Produk berhasil diupdate', produk);
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Cek apakah produk ada
      const existingProduk = await ProdukModel.getById(id);
      if (!existingProduk) {
        return errorResponse(res, 'Produk tidak ditemukan', 404);
      }
      
      // Hapus gambar jika ada
      if (existingProduk.gambar) {
        await ProdukModel.deleteImage(existingProduk.gambar);
      }
      
      await ProdukModel.delete(id);
      return successResponse(res, 'Produk berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ProdukController;
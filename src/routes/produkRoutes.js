const express = require('express');
const router = express.Router();
const ProdukController = require('../controllers/produkController');
const authenticate = require('../middleware/auth');

// Public routes
router.get('/', ProdukController.getAll);
router.get('/:id', ProdukController.getById);

// Protected routes (butuh authentication)
router.post('/', authenticate, ProdukController.upload, ProdukController.create);
router.put('/:id', authenticate, ProdukController.upload, ProdukController.update);
router.delete('/:id', authenticate, ProdukController.delete);

module.exports = router;
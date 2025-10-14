const express = require('express');
const router = express.Router();
const PengumumanController = require('../controllers/pengumumanController');
const authenticate = require('../middleware/auth');

// Public routes
router.get('/', PengumumanController.getAll);
router.get('/:id', PengumumanController.getById);

// Protected routes (butuh authentication)
router.post('/', authenticate, PengumumanController.create);
router.put('/:id', authenticate, PengumumanController.update);
router.delete('/:id', authenticate, PengumumanController.delete);

module.exports = router;
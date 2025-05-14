const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Rutas para calificaciones
router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatingById);
router.post('/', ratingController.createRating);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;
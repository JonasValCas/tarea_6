const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/authJwt');

// Rutas del dashboard (protegidas por autenticación)
router.get('/', dashboardController.renderDashboard);
router.get('/movies', dashboardController.renderMovies);
router.get('/genres', dashboardController.renderGenres);
router.get('/ratings', dashboardController.renderRatings);

module.exports = router;

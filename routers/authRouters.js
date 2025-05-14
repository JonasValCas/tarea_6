const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authJwt');

// Rutas de vistas
router.get('/login', authController.renderLogin);
router.get('/register', authController.renderRegister);
router.get('/profile', authController.renderProfile);

// Rutas de API públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas de API protegidas
router.get('/profile-data', verifyToken, authController.getProfile);
router.post('/change-password', verifyToken, authController.changePassword);

module.exports = router;

const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const User = require('../models/userModel');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó token de autenticación' });
    }
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Requiere rol de administrador' });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

// Renderizar vistas
exports.renderLogin = (req, res) => {
    res.render('auth/login');
};

exports.renderRegister = (req, res) => {
    res.render('auth/register');
};

exports.renderProfile = (req, res) => {
    res.render('auth/profile');
};

// API de autenticación
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, password } = req.body;
        
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear nuevo usuario
        const newUser = new User({
            nombre,
            apellido,
            email,
            telefono,
            password: hashedPassword
        });
        
        await newUser.save();
        
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            config.secret,
            { expiresIn: config.expiresIn }
        );
        
        res.status(200).json({
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            role: user.role,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Buscar usuario
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Verificar contraseña actual
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }
        
        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Actualizar contraseña
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

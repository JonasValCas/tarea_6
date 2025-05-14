const RatingService = require('../services/ratingService');
const ratingService = new RatingService();

exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await ratingService.getAll();
        res.status(200).json(ratings);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await ratingService.getById(req.params.id);
        if (!rating) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }
        res.status(200).json(rating);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.createRating = async (req, res) => {
    try {
        const rating = await ratingService.create(req.body);
        res.status(201).json(rating);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const rating = await ratingService.update(req.params.id, req.body);
        if (!rating) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }
        res.status(200).json(rating);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.deleteRating = async (req, res) => {
    try {
        const rating = await ratingService.delete(req.params.id);
        if (!rating) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }
        res.status(200).json({ message: 'Calificación eliminada correctamente' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
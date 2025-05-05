const RatingService = require('../services/ratingService');
const ratingService = new RatingService();

exports.getAllRatings = async (req, res) => {
    const ratings = await ratingService.getAll();
    res.status(200).json(ratings);
};

exports.createRating = async (req, res) => {
    try {
        const rating = await ratingService.create(req.body);
        res.status(201).json(rating);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
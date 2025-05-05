const Rating = require('../models/ratingModel');

class RatingService {
    async getAll() {
        return await Rating.find().populate('user').populate('movie');
    }

    async create(data) {
        const rating = new Rating(data);
        return await rating.save();
    }
}

module.exports = RatingService;
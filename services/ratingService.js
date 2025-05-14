const Rating = require('../models/ratingModel');

class RatingService {
    async getAll() {
        return await Rating.find().populate('user').populate('movie');
    }

    async getById(id) {
        return await Rating.findById(id).populate('user').populate('movie');
    }

    async create(data) {
        const rating = new Rating(data);
        await rating.save();
        return await Rating.findById(rating._id).populate('user').populate('movie');
    }

    async update(id, data) {
        return await Rating.findByIdAndUpdate(id, data, { new: true }).populate('user').populate('movie');
    }

    async delete(id) {
        return await Rating.findByIdAndDelete(id);
    }
}

module.exports = RatingService;
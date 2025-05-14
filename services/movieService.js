const Movie = require('../models/movieModel');

class MovieService {
    async getAll() {
        return await Movie.find().populate('genre');
    }

    async getById(id) {
        return await Movie.findById(id).populate('genre');
    }

    async create(data) {
        const movie = new Movie(data);
        await movie.save();
        return await Movie.findById(movie._id).populate('genre');
    }

    async update(id, data) {
        return await Movie.findByIdAndUpdate(id, data, { new: true }).populate('genre');
    }

    async delete(id) {
        return await Movie.findByIdAndDelete(id);
    }
}

module.exports = MovieService;
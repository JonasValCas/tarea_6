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
        return await movie.save();
    }

    async update(id, data) {
        return await Movie.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Movie.findByIdAndDelete(id);
    }
}

module.exports = MovieService;
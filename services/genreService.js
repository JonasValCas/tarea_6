const Genre = require('../models/genreModel');

class GenreService {
    async getAll() {
        return await Genre.find();
    }

    async create(data) {
        const genre = new Genre(data);
        return await genre.save();
    }
}

module.exports = GenreService;
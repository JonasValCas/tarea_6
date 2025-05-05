const GenreService = require('../services/genreService');
const genreService = new GenreService();

exports.getAllGenres = async (req, res) => {
    const genres = await genreService.getAll();
    res.status(200).json(genres);
};

exports.createGenre = async (req, res) => {
    try {
        const genre = await genreService.create(req.body);
        res.status(201).json(genre);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
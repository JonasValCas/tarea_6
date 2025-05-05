const MovieService = require('../services/movieService');
const movieService = new MovieService();

exports.getAllMovies = async (req, res) => {
    const movies = await movieService.getAll();
    res.status(200).json(movies);
};

exports.getMovie = async (req, res) => {
    const movie = await movieService.getById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movie);
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await movieService.create(req.body);
        res.status(201).json(movie);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updated = await movieService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'No encontrada' });
        res.status(200).json(updated);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const deleted = await movieService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrada' });
    res.status(200).json({ message: 'Película eliminada' });
};
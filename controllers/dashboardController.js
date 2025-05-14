const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');
const Rating = require('../models/ratingModel');
const User = require('../models/userModel');

// Renderizar el dashboard principal
exports.renderDashboard = async (req, res) => {
    try {
        // Obtener conteos para mostrar en el dashboard
        const movieCount = await Movie.countDocuments();
        const genreCount = await Genre.countDocuments();
        const ratingCount = await Rating.countDocuments();
        
        res.render('dashboard', {
            counts: {
                movies: movieCount,
                genres: genreCount,
                ratings: ratingCount
            }
        });
    } catch (error) {
        console.error('Error en dashboard:', error);
        res.render('dashboard', { error: 'Error al cargar los datos' });
    }
};

// Renderizar la vista de películas
exports.renderMovies = async (req, res) => {
    try {
        // Obtener películas y géneros para el renderizado inicial (opcional)
        const movies = await Movie.find().populate('genre');
        const genres = await Genre.find();
        
        res.render('movies_new', {
            movies: movies,
            genres: genres
        });
    } catch (error) {
        console.error('Error en movies:', error);
        res.render('movies_new', { error: 'Error al cargar los datos' });
    }
};

// Renderizar la vista de géneros
exports.renderGenres = async (req, res) => {
    try {
        // Obtener géneros para el renderizado inicial (opcional)
        const genres = await Genre.find();
        
        res.render('genres_new', {
            genres: genres
        });
    } catch (error) {
        console.error('Error en genres:', error);
        res.render('genres_new', { error: 'Error al cargar los datos' });
    }
};

// Renderizar la vista de calificaciones
exports.renderRatings = async (req, res) => {
    try {
        // Obtener calificaciones, películas y usuarios para el renderizado inicial (opcional)
        const ratings = await Rating.find().populate('movie').populate('user');
        const movies = await Movie.find();
        const users = await User.find();
        
        res.render('ratings_new', {
            ratings: ratings,
            movies: movies,
            users: users
        });
    } catch (error) {
        console.error('Error en ratings:', error);
        res.render('ratings_new', { error: 'Error al cargar los datos' });
    }
};

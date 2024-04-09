import mongoose from 'mongoose';
import Movie from '../models/movie.js';

const getMovies = async (req, res) => {
    const { page } = req.query;
    const MOVIE_PER_PAGE = 20;
    const moviesToSkip = (+page - 1) * MOVIE_PER_PAGE;
    try {
        const movies = await Movie.aggregate([
            { $project: { title: 1, year: 1, cast: 1, genres: 1, href: 1, extract: 1 } },
            { $sort: { year: -1 } },
            { $skip: moviesToSkip },
            { $limit: MOVIE_PER_PAGE }
        ]);
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getMovieDetail = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(movieId) } },
            { $project: { title: 1, year: 1, cast: 1, genres: 1, href: 1, extract: 1 } },
        ]);
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

const getSearchMovies = async (req, res) => {
    const { title } = req.query;
    try {
        const movies = await Movie.aggregate([
            { $match: { title: { $regex: title, $options: 'i' } } },
            { $project: { title: 1, year: 1, cast: 1, genres: 1, href: 1, extract: 1 } },
        ]);
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

const getGenres = async (req, res) => {
    try {
        const genres = await Movie.aggregate([
            { $unwind: '$genres' },
            { $group: { _id: '$genres', movies: { $sum: 1 } } },
            { $project: { name: '$_id', movies: 1, _id: 0 } }
        ]);
        return res.status(200).json(genres);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export { getMovies, getMovieDetail, getSearchMovies, getGenres }
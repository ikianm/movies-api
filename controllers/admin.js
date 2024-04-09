import Movie from '../models/movie.js';
import { throwError } from '../utils/throwError.js';
import mongoose from 'mongoose';

const postAddMovie = async (req, res) => {
    const { title, year, cast, genres, href, extract } = req.body;
    try {
        const isInputValid = title && year && cast && genres;
        if (!isInputValid) throwError(400, 'Invalid input');
        const movie = new Movie({ title, year, cast, genres, href, extract, createdUser: req.user._id });
        await movie.save();
        return res.status(201).json(movie);

    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const postEditMovie = async (req, res) => {
    const { movieId } = req.params;
    const { title, year, cast, genres, href, extract } = req.body;
    try {
        const movie = await Movie.findById(movieId);
        const isUserCreatedMovie = (movie.createdUser).toString() === (req.user._id).toString();
        if (!isUserCreatedMovie) throwError(402, 'You are not owner of this movie');
        movie.title = title;
        movie.year = year;
        movie.cast = cast;
        movie.genres = genres;
        movie.href = href;
        movie.extract = extract;
        await movie.save();
        return res.status(200).json({ movie });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const postDeleteMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findById(movieId);
        const isUserCreatedMovie = (movie.createdUser).toString() === (req.user._id).toString();
        if (!isUserCreatedMovie) throwError(402, 'You are not owner of this movie');
        await Movie.findOneAndDelete({ _id: new mongoose.Types.ObjectId(movieId) });
        return res.status(200).json({ message: `movie (${movieId}) deleted.` });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export { postAddMovie, postEditMovie, postDeleteMovie };
import express from 'express';
import { getMovies, getMovieDetail, getSearchMovies, getGenres } from '../controllers/movie.js';

const router = express.Router();

router.get('/', getMovies);

router.get('/search', getSearchMovies);

router.get('/genres', getGenres);

router.get('/:movieId', getMovieDetail);


export default router;
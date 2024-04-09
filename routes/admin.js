import express from 'express';
import { postAddMovie, postEditMovie, postDeleteMovie } from '../controllers/admin.js';

const router = express.Router();

router.post('/movies', postAddMovie);

router.patch('/movies/:movieId', postEditMovie);

router.delete('/movies/:movieId', postDeleteMovie);

export default router;
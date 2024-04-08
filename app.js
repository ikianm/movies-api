import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';

import { isAuth } from './middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json());
app.use('/static', express.static(join(__dirname, 'static')));

//Routes
app.use('/auth', authRoutes);

try {
    await mongoose.connect(process.env.MONGODB_URI);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`App is listening on port ${port}`));
} catch (err) {
    console.log(err)
}



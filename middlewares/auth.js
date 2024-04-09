import jwt from 'jsonwebtoken';
import { throwError } from '../utils/throwError.js';

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) throwError(402, 'No authorization header found.')
        const [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() !== 'bearer') throwError(402, 'Invalid authorization scheme.');
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        return next();

    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role === 'ADMIN') {
            return next();
        } else {
            return throwError(401, 'You are not an admin');
        }
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }

};

export { isAuth, isAdmin };
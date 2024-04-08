import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) throw new Error('No authorization header found.');
        const [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() !== 'bearer') throw new Error('Invalid authorization scheme.');

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decodedUser);
        next();

    } catch (err) {
        console.log(err.message);
        return res.status(402).json({ message: 'Unauthorized' });
    }
};

export { isAuth }
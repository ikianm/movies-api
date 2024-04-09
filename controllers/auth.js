import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { throwError } from '../utils/throwError.js';

const postRegister = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        console.log(checkUser);
        if (checkUser) throwError(409, 'Email already exists.');
        const hashSalt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, hashSalt);
        const user = new User({ email, username, password: hashedPassword, role: 'USER' });
        await user.save();
        return res.status(201).json(user);
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).lean(); // we can usse delete on the retrived obejct
        if (!user) throwError(404, 'User not found.');
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throwError(401, 'Incorrect password.');
        const token = jwt.sign(user, process.env.JWT_SECRET);
        delete user.password;
        return res.status(202).json({ user, token });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: 'Database failed to connect' });
    }
};


export { postLogin, postRegister };
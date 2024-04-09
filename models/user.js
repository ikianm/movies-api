import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        maxLength: 25,
        minLength: 5,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER',
        enum: ['USER', 'ADMIN']
    },
    addedMovie: {
        type: [Schema.Types.ObjectId],
        ref: 'Movie'
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: false
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default model('User', userSchema);
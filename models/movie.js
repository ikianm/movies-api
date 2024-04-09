import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
        default: []
    },
    genres: {
        type: [String],
        required: true,
        default: []
    },
    href: {
        type: String,
        default: ''

    },
    extract: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: false
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: false
    },
    createdUser: {
        type: Schema.Types.ObjectId,
        immutable: false
    }
});

movieSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

movieSchema.index({ title: 1 });

export default model('Movie', movieSchema);

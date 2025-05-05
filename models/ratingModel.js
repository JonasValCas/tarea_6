const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    score: { type: Number, min: 1, max: 5 },
    comment: String
});

module.exports = mongoose.model('Rating', ratingSchema);
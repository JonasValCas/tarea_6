const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    description: String,
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    releaseYear: Number
});

module.exports = mongoose.model('Movie', movieSchema);
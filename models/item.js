const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorOrDirector: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true }
});

module.exports = mongoose.model('Item', itemSchema);

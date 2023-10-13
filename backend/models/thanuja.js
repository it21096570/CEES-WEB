const mongoose = require('mongoose');

const thanujaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more fields like name, profile picture, etc. as needed
});

const Thanuja = mongoose.model('Thanuja', thanujaSchema);

module.exports = Thanuja;
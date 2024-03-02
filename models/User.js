const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    birthdate: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other']},
    bio: String
    //, token: { type: String }
});

module.exports = mongoose.model('User', userSchema);
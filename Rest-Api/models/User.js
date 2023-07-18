const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'Username should be at least 3 characters!'],
        maxLength: [25, 'Username must be no more than 25 characters!']
    },

    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/,
        // unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [3, 'Password should be at least 3 characters!'],
    }
});

userSchema.pre('save', async function () {

    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');

exports.register = (username, email, password) => {

    const userData = { username, email, password };

    return User.create(userData);
}

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw {
            message: 'Invalid email or password'
        }
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid email or password'
        }
    }
    return user;
}

exports.createToken = (user) => {

    const payload = { _id: user._id, email: user.email, username: user.username };
    const option = { expiresIn: '2d' };

    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, option, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
    return tokenPromise;
}

exports.getUser = (userId) => User.findOne({ _id: userId }, { password: 0, __v: 0 });// да ми върне user-a без паролата;
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');

exports.register = async (username, email, password) => {

    const existingUser = await User.findOne({ $or: [{ username }, { email }] }); // проверяваме дали има съществуваш потребител с този username или парола;

    if(existingUser.username === username){
        throw { 
            message: 'Username is already taken!'
        }
    }

    if(existingUser.email === email) {
        throw {
            message: 'Email is already taken!'
        }
    }

    // if (existingUser) {
    //     throw {
    //         message: 'Username or email is already taken!'
    //     }
    // }

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
    const option = { expiresIn: '1h' };

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

exports.editUser = async (userId, userData) => {

    const existingUserWithUsername = await User.findOne({ username: userData.username });

    if (existingUserWithUsername && existingUserWithUsername._id.toString() !== userId) {
        throw {
            message: 'A user with this username already exists!'
        }
    }

    const existingUserWithEmail = await User.findOne({ email: userData.email });

    if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
        throw {
            message: 'A user with this email already exists!'
        }
    }

    return await User.updateOne({ _id: userId }, { $set: userData }, { runValidators: true });
}

exports.deleteUser = (userId) => User.findByIdAndDelete(userId);
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');
const { COOKIE_SESION_NAME } = require('../constants');

exports.auth = (req, res, next) => {

    const token = req.cookies[COOKIE_SESION_NAME];

    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(COOKIE_SESION_NAME);

                res.redirect('/auth/login');
            }

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();
        }));
    } else {
        next();
    }

    // const token = req.header('Authorization');

    // if (token) {

    //     try {
    //         const decodedToken = jwt.verify(token, SECRET);

    //         req.user = decodedToken;

    //         next();
    //     } catch (error) {
    //         res.status(401).json({
    //             message: 'You are not auhtorized!',
    //         })
    //     }
    // } else {
    //     next();
    // }
}
const router = require('express').Router();

const userServices = require('../services/userServices');

const { COOKIE_SESION_NAME } = require('../constants');

router.post('/register', async (req, res) => {

    try {

        const { username, email, password } = req.body;
        const user = await userServices.register(username, email, password);
        const token = await userServices.createToken(user);

        res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true });
        res.json({
            authToken: token,
            username: user.username,
            email: user.email,
            password: user.password,
            _id: user._id,
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
});

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userServices.login(email, password);
        const token = await userServices.createToken(user);

        res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true });
        res.json({
            authToken: token,
            username: user.username,
            email: user.email,
            _id: user._id,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

});

router.get('/user', async (req, res) => {

    try {
        const userId = req.user._id;

        const user = await userServices.getUser(userId);

        res.json({
            _id: user._id,
            email: user.email,
            username: user.username
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie(COOKIE_SESION_NAME);
    res.json({});
    res.status(200);
});


module.exports = router;
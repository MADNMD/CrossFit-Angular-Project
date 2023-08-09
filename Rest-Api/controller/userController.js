const router = require('express').Router();

const userServices = require('../services/userServices');

const { COOKIE_SESION_NAME } = require('../constants');
const { getErrorMessage } = require('../utils/errorHellper');

router.post('/register', async (req, res) => {

    try {

        const { username, email, password } = req.body;
        const user = await userServices.register(username, email, password);
        const token = await userServices.createToken(user);

        if (process.env.NODE_ENV) {

        }

        // res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true });
        res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true, sameSite: 'none', secure: true });
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

        // res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true });
        res.cookie(COOKIE_SESION_NAME, token, { httpOnly: true, sameSite: 'none', secure: true });
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

router.put('/edit/:userId', async (req, res) => {

    try {

        const userId = req.user._id;
        const { username, email } = req.body;

        const updateUserData = { username, email };

        const editUser = await userServices.editUser(userId, updateUserData);

        res.status(200).json(editUser)
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.delete('/delete/:userId', async (req, res) => {

    try {

        // const userId = req.params.userId;
        const userId = req.user._id;
        console.log('Received delete request for userId:', userId);
        console.log(userId);
        await userServices.deleteUser(userId);
        console.log('User deleted successfully.');
        res.clearCookie(COOKIE_SESION_NAME);
        res.status(200).end();
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie(COOKIE_SESION_NAME);
    res.json({});
    res.status(200);
});


module.exports = router;
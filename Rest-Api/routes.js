const router = require('express').Router();

const userController = require('./controller/userController');
const workoutController = require('./controller/workoutController');

router.use('/users', userController);
router.use('/workouts', workoutController);

module.exports = router;
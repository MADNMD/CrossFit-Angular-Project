const router = require('express').Router();

const workoutServices = require('../services/workoutServices');
const { getErrorMessage } = require('../utils/errorHellper');

router.get('/allWorouts', async (req, res) => {

    try {
        const allWorouts = await workoutServices.getAllWorkout();

        res.json(allWorouts);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }

});

router.post('/createWorkout', async (req, res) => {

    try {
        const { difficultyLevel, typeTraining, image, trainingDuration, exercises, likes, owner } = req.body;
        const createWorkout = await workoutServices.createWorkout({ difficultyLevel, typeTraining, image, trainingDuration, exercises, likes, owner });

        res.status(201).json(createWorkout);
        // res.status(201).end();
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.get('/details/:workoutId', async (req, res) => {

    try {
        const workout = await workoutServices.getOneDetailed(req.params.workoutId);

        res.json(workout);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.put('/edit/:workoutId', async (req, res) => {

    try {
        const editWorkout = await workoutServices.editWorkout(req.params.workoutId, req.body);
        // await workoutServices.editWorkout(req.params.workoutId, req.body);

        // res.status(200).end();
        res.status(200).json(editWorkout);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.delete('/delete/:workoutId', async (req, res) => {

    try {
        await workoutServices.delete(req.params.workoutId);

        res.status(200).end();
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.get('/myWorkouts/:userId', async (req, res) => {

    try {
        const userId = req.params.userId;
        const myWorkouts = await workoutServices.myWorkouts(userId);

        res.json(myWorkouts);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});


module.exports = router;
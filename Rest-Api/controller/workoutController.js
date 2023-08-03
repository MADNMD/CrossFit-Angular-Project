const router = require('express').Router();

const workoutServices = require('../services/workoutServices');
const { getErrorMessage } = require('../utils/errorHellper');

router.get('/allWorouts', async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const pageSize = 3;
        
        const { workouts, totalPage } = await workoutServices.getAllWorkout(page, pageSize);
        
        res.json({ workouts, totalPage });
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
        const page = parseInt(req.query.page) || 1;
        const pageSize = 3;
       
        const userId = req.params.userId;
        const { workouts, totalPage } = await workoutServices.myWorkouts(userId, page, pageSize);
        
        res.json({ workouts, totalPage });
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        })
    }
});

router.post('/like/:workoutId', async (req, res) => {

    try {
        const workoutId = req.params.workoutId;
        const userId = req.body.userId;

        const workout = await workoutServices.getOne(workoutId);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }

        if (workout.likes.includes(userId)) {
            return res.status(400).json({ error: 'User already liked thish workout' })
        }

        workout.likes.push(userId);
        await workout.save();

        res.json(workout);
    } catch (error) {
        console.error('Error while liking the post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/unlike/:workoutId', async (req, res) => {

    try {
        const workoutId = req.params.workoutId;
        const userId = req.body.userId;

        const workout = await workoutServices.getOne(workoutId);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        workout.likes = workout.likes.filter(likedUserId => likedUserId != userId);
        await workout.save();

        res.json(workout);
    } catch (error) {
        console.error('Error while liking the post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/search', async (req, res) => {

    try {

        const typeTraining = req.query.typeTraining;
        let searchingtypeTraining = await workoutServices.searchWorkouts(typeTraining);

        if (!typeTraining) {
            return res.status(400).json({ error: 'Missing query parameter: typeTraining' });
        }

        if (searchingtypeTraining.length === 0) {
            searchingtypeTraining = await workoutServices.getAllWorkout();
        }


        res.json(searchingtypeTraining)
    } catch (error) {
        console.log('No searching result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
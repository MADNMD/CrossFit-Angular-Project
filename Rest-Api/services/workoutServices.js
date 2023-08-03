const Workout = require('../models/Workout');

exports.getAllWorkout = async (page, pageSize) => {

    const skip = (page - 1) * pageSize;
    const totalWorkouts = await Workout.countDocuments();
    const totalPage = Math.ceil(totalWorkouts / pageSize);

    const allWorkouts = await Workout.find().skip(skip).limit(pageSize);

    return {
        workouts: allWorkouts,
        totalPage,
    }
};
// exports.getAllWorkout = async (qs) => {

//     let query = Workout.find();

//     if (qs.where) {
//         let [fieldName, ownerId] = qs.where.split('=');
//         ownerId = ownerId.replaceAll('"', '');
//         query = query.find({ owner: ownerId });
//     }

//     const result = await query;

//     return result;
// }

exports.createWorkout = (workoutData) => Workout.create(workoutData);

exports.getOneDetailed = (workoutId) => Workout.findById(workoutId).populate('owner');

exports.getOne = (wokroutId) => Workout.findById(wokroutId);

exports.editWorkout = (workoutId, workoutData) => Workout.updateOne({ _id: workoutId }, { $set: workoutData }, { runValidators: true });

exports.delete = (workoutId) => Workout.findByIdAndDelete(workoutId);

exports.myWorkouts = async (userId, page, pageSize) => {

    try {
        const skip = (page - 1) * pageSize;
        const totalMyWorkouts = await Workout.countDocuments({ owner: userId });
        const totalPage = Math.ceil(totalMyWorkouts / pageSize);

        const myWorkouts = await Workout.find({ owner: userId }).skip(skip).limit(pageSize);

        return {
            workouts: myWorkouts,
            totalPage
        };
    } catch (error) {
        throw error;
    }
}

exports.searchWorkouts = async (typeTraining) => {

    if (typeTraining) {
        return (Workout.find({ typeTraining: { $regex: typeTraining, $options: 'i' } }))
    }
}
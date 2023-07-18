const Workout = require('../models/Workout');

exports.getAllWorkout = () => Workout.find();
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

exports.myWorkout = (userId) => Workout.find({ owner: userId });
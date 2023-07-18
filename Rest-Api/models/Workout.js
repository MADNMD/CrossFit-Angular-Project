const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

    difficultyLevel: {
        type: String,
        required: [true, 'Difficulty level is required!'],
        enum: ['Beginner', 'Average', 'Advanced',]
    },

    typeTraining: {
        type: String,
        required: [true, 'Type Training is required!'],
    },

    image: {
        type: String,
        required: [true, 'Image URL is required!'],
        match: [/^https?:\/\//, 'The photo image is required and should start with http:// or https://!'],
    },

    trainingDuration: {
        type: String,
        required: [true, 'Training Duration is required!'],
        // enum: ['5 min', '10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min', '50 min', '55 min', '60 min',]
    },

    exercises: {
        type: String,
        required: [true, 'Exercises is required!']
    },

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
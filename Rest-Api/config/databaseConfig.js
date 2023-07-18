const mongoose = require('mongoose');

const { DB_CONECTION_URL } = require('./env');

exports.intiDB = () => {

    mongoose.connection.on('open', () => console.log('Database is conected!'));

    mongoose.connect(DB_CONECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
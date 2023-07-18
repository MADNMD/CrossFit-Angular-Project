const express = require('express');
const coockiParser = require('cookie-parser');
const cors = require('cors');

const expresConfig = require('./config/expressConfig');
const { intiDB } = require('./config/databaseConfig');
const { PORT } = require('./config/env');
const router = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

expresConfig(app);
app.use(cors());
app.use(auth);
app.use(coockiParser());
app.use(router);


intiDB();

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));


// CORS HEADERS
// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     next();
// });
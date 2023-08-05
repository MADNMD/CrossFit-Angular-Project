const express = require('express');
const coockiParser = require('cookie-parser');
const cors = require('cors');

const expresConfig = require('./config/expressConfig');
const { intiDB } = require('./config/databaseConfig');
const { PORT } = require('./config/env');
const router = require('./routes');
const { auth } = require('./middlewares/authMiddleware');
const { getErrorMessage } = require('../Rest-Api/utils/errorHellper')

const app = express();

expresConfig(app);
// app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(cors({ origin: 'https://corssfit.netlify.app', credentials: true }));
app.use(coockiParser());
app.use(auth);
app.use(router);
app.use(getErrorMessage)


intiDB();

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));


// CORS HEADERS
// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     next();
// });
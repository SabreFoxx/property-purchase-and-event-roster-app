import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';

/* init sequelize and load models */
const environment = process.env.NODE_ENV || 'development'; // defaults to development environment
import db from './models/index.js';
// synchronize sequelize with database
(async () => {
    // do not destructively alter the database during prodction
    if (environment == 'production') {
        console.log('...running in production mode...');
        return await db.sequelize.sync(); // doesn't alter the database
    } else {
        console.log('...running in development mode...');
        return await db.sequelize.sync({ alter: true });
    }
})()
    .then(res => console.log('...sequelize loaded, database synced.'))
    .catch(err => console.log(err));
/* end sequelize and database initialization */

// configure passport. We'll later initialize it in this app.js
import './config/passport.js';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // we initialize passport now
app.use('/api', (req, res, next) => { // setup CORS
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/api', apiRouter);
app.use('/', indexRouter);

// when our supplied token in routes/api.js is invalid, the authentication middleware throws
// an error to prevent the code from continuing. We need to catch this error and return a
// message and status 
// we added it as the first error handler here, so that generic handlers don’t intercept it
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401)
            .json({ message: `${err.name} : ${err.message}` });
    }
});

export default app;

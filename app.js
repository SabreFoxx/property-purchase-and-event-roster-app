import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

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

import indexRouter from './routes/index.js';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

export default app;

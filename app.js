import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// init sequelize, then load models
import db from './models/index.js';
// synchronize sequelize
db.sequelize.sync({ alter: true })
    .then(res => console.log('db synced'))
    .catch(err => console.log(err));

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

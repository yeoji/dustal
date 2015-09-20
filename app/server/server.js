import express from "express";
import passport from "passport";
import routes from "./routes";
import logger from "./config/logger";

import db from '../database/db';

export const app = express();

// Bootstrap application settings
require('./config/express')(app, passport);

// Set up logger
logger(app);

// Bootstrap passport config
const database = db(passport);

// set db instance
app.use(function (req, res, next) {
    req.db = database;
    next();
});

// Bootstrap routes
routes(app, passport);

var server = app.listen(app.get('port'));

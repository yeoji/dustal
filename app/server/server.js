import express from "express";
import passport from "passport";
import routes from "./routes";

import db from '../database/init';

export const app = express();

// set db instance
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap passport config
require('./config/passport')(passport, db);

// Bootstrap routes
routes(app, passport);

var server = app.listen(app.get('port'));

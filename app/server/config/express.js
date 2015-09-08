import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import secrets from "./secrets";

export default function (app, passport) {
    app.set('port', (process.env.PORT || 3000));

    app.set('views', __dirname + '/../../../resources/views');
    app.set('view engine', 'jade');

    app.use(express.static('public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    // Cookie parser should be above session
    // cookieParser - Parse Cookie header and populate req.cookies with an object keyed by cookie names
    // Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret
    // so it may be used by other middleware
    app.use(cookieParser());

    app.use(session({
        secret: secrets.sessionSecret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

};
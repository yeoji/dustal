import express from "express";
import render from "../render";
import tokenHelper from "./tokenHelper";
const reactRouter = express.Router();

/******************
 *  React Routes  *
 ******************/

// auth pages do not require authentication
reactRouter.use('/auth/*', function (req, res) {
    const content = render(req, JSON.stringify({}));
    res.render('index', {content: content});
});

reactRouter.use('/', (req, res) => {
    const content = render(req, JSON.stringify({}));
    res.render('index', {content: content});
});

// Route for rendering React components (requires auth)
reactRouter.use('*', tokenHelper.verifyToken, function (req, res) {
    res.locals.data = {
        UserStore: {
            user: {
                first_name: res.locals.user.first_name,
                last_name: res.locals.user.last_name,
                email: res.locals.user.email
            }
        }
    };
    const content = render(req, JSON.stringify(res.locals.data));
    res.render('index', {content: content});
});

export default reactRouter;
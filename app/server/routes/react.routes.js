import express from "express";
import render from "../render";
import tokenHelper from "./tokenHelper";
const reactRouter = express.Router();

/******************
 *  React Routes  *
 ******************/

reactRouter.get('/', (req, res) => {
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
                email: res.locals.user.email,
                username: res.locals.user.username,
                mobile: {
                    country_code: res.locals.user.mobile.country_code,
                    number: res.locals.user.mobile.number,
                    is_verified: res.locals.user.mobile.is_verified
                }
            }
        }
    };
    const content = render(req, JSON.stringify(res.locals.data));
    res.render('index', {content: content});
});

export default reactRouter;
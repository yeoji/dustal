import express from "express";
import render from "../render";
import tokenHelper from "./tokenHelper";
import _ from "lodash";
const reactRouter = express.Router();

/******************
 *  React Routes  *
 ******************/

reactRouter.get('/', (req, res) => {
    const content = render(req, JSON.stringify({}));
    res.render('index', {content: content});
});

reactRouter.get('/account', tokenHelper.verifyToken, (req, res, next) => {
    // we need to populate the user's blog data to the BlogStore
    req.db.repositories.BlogRepository.findById(res.locals.user.blogs[0], req.db.connection)
        .then((data) => {
            delete data.password;
            res.locals.data = {
                BlogStore: {
                    blog: data
                }
            };
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

// Route for rendering React components (requires auth)
reactRouter.use('*', tokenHelper.verifyToken, function (req, res) {
    const UserStore = {
        user: {
            id: res.locals.user._id,
            first_name: res.locals.user.first_name,
            last_name: res.locals.user.last_name,
            email: res.locals.user.email,
            username: res.locals.user.username,
            profile_img: res.locals.user.profile_img,
            mobile: {
                country_code: res.locals.user.mobile.country_code,
                number: res.locals.user.mobile.number,
                is_verified: res.locals.user.mobile.is_verified
            }
        }
    };
    let data = _.assign(res.locals.data || {}, {UserStore: UserStore});

    const content = render(req, JSON.stringify(data));
    res.render('index', {content: content});
});

export default reactRouter;
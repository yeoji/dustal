import render from "./render";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/

    app.post('/api/users/register', function(req, res, next) {

        // generate the authenticate method and pass the req/res
        // custom callback
        passport.authenticate('register', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.status(403).json({
                    error: true,
                    message: info.message
                });
            }

            // log in user
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                });
            });

        })(req, res, next);

    });

    app.post('/api/users/login', function(req, res, next) {

        // generate the authenticate method and pass the req/res
        // custom callback
        passport.authenticate('login', function(err, user, info) {
            if (err !== null) { return next(err); }
            if (!user) {
                return res.status(403).json({
                    error: true,
                    message: info.message
                });
            }

            // log in user
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                });
            });

        })(req, res, next);

    });

    app.get('/api/users/logout', function (req, res) {
        req.logout();
        // there is still a user object set
        if(req.user) {
            res.status(500).json({
                error: true,
                message: 'Failed to log out user.'
            });
        }

        res.status(200).json({
            error: false,
            message: 'User logged out.'
        });
    });


    /****************
     *  API Routes  *
     ****************/


    /******************
     *  React Routes  *
     ******************/

    // auth middleware to protect access serverside
    const auth = (req, res, next) => {
        if (req.user) {
            next();
        }
        res.redirect('/auth/login');
    };

    // auth pages do not require authentication
    app.use('/auth/*', function(req, res) {
        const content = render(req, JSON.stringify({}));
        res.render('index', {content: content});
    });

    // Route for rendering React components (requires auth)
    app.use('*', auth, function (req, res) {
        res.locals.data = {
            UserStore: {
                user: {
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email
                }
            }
        };
        const content = render(req, JSON.stringify(res.locals.data));
        res.render('index', {content: content});
    });

}
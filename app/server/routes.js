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
                return res.status(200).json(user);
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
                return res.status(200).json(user);
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


    // Route for rendering React components
    app.use('*', function (req, res) {
        res.locals.data = {
            UserStore: {
                user: req.user
            }
        };
        const content = render(req, JSON.stringify(res.locals.data));
        res.render('index', {content: content});
    });

}
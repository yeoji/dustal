import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from "bcrypt-nodejs";

export default function (passport, db) {
    // passport config
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        const usernamePromise = new db.models.User({id: id}).fetch();
        usernamePromise.then(function (model) {
            done(null, model);
        });
    });

    passport.use('register', new LocalStrategy({usernameField: 'email', passReqToCallback: true},
            function (req, username, password, done) {
                /*if (password !== req.body.password2) {
                    return done(null, false, {message: 'Passwords don\'t match'});
                }*/
                const user = req.body;
                const dbUser = new req.db.models.User({email: username}).fetch();
                return dbUser.then(function (model) {
                    if (model) {
                        return done(null, false, {message: 'User Already Exists.'});
                    }
                    const hash = bcrypt.hashSync(password);
                    const newUser = new req.db.models.User({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: hash
                    });
                    newUser.save().then(function (savedUser) {
                        return done(null, savedUser, {message: 'User Registered.'});
                    }).otherwise(function (err) {
                        return done(err);
                    });
                });
            })
    );

    passport.use('login', new LocalStrategy({usernameField: 'email'},
        function (username, password, done) {
            const User = db.models.User.forge({email: username});
            User.fetch().then(function (data) {
                if (data === null) {
                    return done(null, false, {message: 'Unknown user.'});
                }
                const user = data.toJSON();
                if (!bcrypt.compareSync(password, user.password)) {
                    console.log('invalid pw?');
                    return done(null, false, {message: 'Invalid username or password.'});
                }
                return done(null, user);
            }).otherwise(function (err) {
                return done(err);
            });
        })
    );
}

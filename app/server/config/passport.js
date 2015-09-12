import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from "bcrypt-nodejs";

export default function (passport, db) {

    passport.use('register', new LocalStrategy({usernameField: 'email', passReqToCallback: true},
            function (req, username, password, done) {
                const user = req.body;
                const dbUser = req.db.repositories.UserRepository.findByEmail(username, db.connection);
                return dbUser.then(function (model) {
                    if (model) {
                        return done(null, false, {message: 'User Already Exists.'});
                    }
                    const hash = bcrypt.hashSync(password);
                    const newUser = req.db.repositories.UserRepository.createUser(user, hash, db.connection);
                    newUser.then(function (savedUser) {
                        return done(null, savedUser, {message: 'User Registered.'});
                    }).catch(function (err) {
                        return done(err);
                    });
                });
            })
    );

    passport.use('login', new LocalStrategy({usernameField: 'email'}, function (username, password, done) {
            const user = db.repositories.UserRepository.findByEmail(username, db.connection);
            return user.then(function (data) {
                if (data === null) {
                    return done(null, false, {message: 'Unknown user.'});
                }
                const user = data.toJSON();
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {message: 'Invalid username or password.'});
                }
                return done(null, user);
            }).catch(function (err) {
                return done(err);
            });
        })
    );
}

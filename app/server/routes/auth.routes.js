import tokenHelper from "./tokenHelper";
import {SmsSender} from "../services/sms/SmsService";
import Chance from "chance";

const smsSender = new SmsSender();
const chance = new Chance();

const sendVerificationCode = (country_code, number, code) => {
    // send verification code to mobile
    const verificationMsg = "Hi, thanks for registering! Your verification code is: " + code;
    smsSender.sendSms(country_code, number, verificationMsg);
};

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/

    app.post('/api/users/register', function (req, res, next) {

        // generate the authenticate method and pass the req/res
        // custom callback
        passport.authenticate('register', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(403).json({
                    error: true,
                    message: info.message
                });
            }

            // no errors, therefore authenticated
            tokenHelper.setToken(user, res);

            sendVerificationCode(user.mobile.country_code, user.mobile.number, user.mobile.verification_code);

            return res.status(200).json({
                error: false,
                message: 'Successfully registered user.',
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                mobile: {
                    is_verified: user.mobile.is_verified,
                    number: user.mobile.number,
                    country_code: user.mobile.country_code
                }
            });

        })(req, res, next);

    });

    app.post('/api/users/login', function (req, res, next) {

        // generate the authenticate method and pass the req/res
        // custom callback
        passport.authenticate('login', function (err, user, info) {
            if (err !== null) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: info.message
                });
            }

            // no errors, therefore authenticated
            tokenHelper.setToken(user, res);
            return res.status(200).json({
                error: false,
                message: 'Successfully logged in!',
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                mobile: {
                    is_verified: user.mobile.is_verified,
                    number: user.mobile.number,
                    country_code: user.mobile.country_code
                }
            });

        })(req, res, next);

    });

    app.get('/api/users/logout', tokenHelper.verifyToken, function (req, res) {

        res.clearCookie('token', {
            secure: false,
            httpOnly: true,
            expires: new Date(Date.now() + 9000000)
        });
        return res.status(200).json({
            error: false,
            message: 'User logged out.'
        });

    });

    /**
     * This handles the regenerating and resending of a verification code
     */
    app.post('/api/users/resend', tokenHelper.verifyToken, (req, res) => {
        const code = chance.natural({min: 1000, max: 9999});
        req.db.repositories.UserRepository.update(res.locals.user._id, {
            mobile: {
                country_code: req.body.country_code,
                number: req.body.number,
                is_verified: false,
                verification_code: code
            }
        }, req.db.connection)
            .then((done) => {
                // send new SMS with code
                sendVerificationCode(req.body.country_code, req.body.number, code);

                return res.status(200).json({
                    error: false,
                    message: 'Verification code resetted!',
                    mobile: {
                        country_code: req.body.country_code,
                        number: req.body.number,
                        is_verified: false
                    }
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: true,
                    message: 'Error in resetting verification code'
                });
            });
    });

    app.post('/api/users/verify', tokenHelper.verifyToken, function (req, res) {

        req.db.repositories.UserRepository.findById(res.locals.user._id, req.db.connection)
            .then((user) => {
                if (req.body.verification_code == user.mobile.verification_code) {
                    req.db.repositories.UserRepository.update(user._id, {mobile: {
                        country_code: user.mobile.country_code,
                        number: user.mobile.number,
                        is_verified: true,
                        verification_code: user.mobile.verification_code
                    }}, req.db.connection)
                        .then((done) => {
                            return res.status(200).json({
                                error: false,
                                message: 'User verified successfully!'
                            });
                        });
                }
                else {
                    return res.status(401).json({
                        error: true,
                        message: 'Invalid verification code'
                    });
                }
            });
    });
}

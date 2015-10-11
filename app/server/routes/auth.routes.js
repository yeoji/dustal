import tokenHelper from "./tokenHelper";
import {SmsSender} from "../services/sms/SmsService";

export default function(app, passport) {

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

            // send verification code to mobile
            const verificationMsg = "Hi, thanks for registering! Your verification code is: " + user.mobile.verification_code;
            SmsSender.sendSms(user.mobile.country_code, user.mobile.number, verificationMsg);

            return res.status(200).json({
                error: false,
                message: 'Successfully registered user.',
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                mobile: user.mobile
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
                email: user.email,
                mobile: user.mobile
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
}

import jwt from "jsonwebtoken";
import secrets from "../config/secrets";

const setToken = (user, res) => {
    const token = jwt.sign(user, secrets.jwtSecret);
    // NOTE: secure is set to false for development
    res.cookie('token', token, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 9000000)
    });
};

// auth middleware for protected routes and deserialization of user from token
const auth = (req, res, next) => {
    try {
        const payload = jwt.verify(req.cookies.token, secrets.jwtSecret);
        req.db.repositories.UserRepository.findById(payload._id, req.db.connection)
            .then((user) => {
                res.locals.user = user;
                next();
            });
    } catch (err) {
        res.status(401).redirect('/auth/login');
    }
};

export default {
    setToken: setToken,
    verifyToken: auth
}
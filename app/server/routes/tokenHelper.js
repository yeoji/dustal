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
            })
            .catch((err) => {
                throw new Error(err);
            });
    } catch (err) {
        res.status(401).redirect('/');
    }
};

const setBlogToken = (blog, req, res) => {
    let blogs = [];
    if(req.cookies.blogs) {
        blogs = jwt.verify(req.cookies.blogs, secrets.jwtSecret);
    }
    blogs.push(blog);

    const token = jwt.sign(blogs, secrets.jwtSecret);
    res.cookie('blogs', token, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 9000000)
    });
};

/**
 * Checks to see if the requested private blog has already been authenticated before
 * @param blog
 * @param req
 * @returns {boolean}
 */
const verifyBlogToken = (blog, req, cookie) => {
    try {
        const blogs = jwt.verify((req ? req.cookies.blogs : cookie.blogs), secrets.jwtSecret);
        console.log('blogs: ' + blogs);
        if(blogs.indexOf(blog) >= 0) {
            console.log('blog: ' + blog);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

export default {
    setToken: setToken,
    verifyToken: auth,
    setBlogToken: setBlogToken,
    verifyBlogToken: verifyBlogToken
}
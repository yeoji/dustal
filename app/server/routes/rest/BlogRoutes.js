import RESTRoutes from "./RESTRoutes";
import bcrypt from "bcrypt-nodejs";
import tokenHelper from "../tokenHelper";
import {SmsHandler} from "../../services/sms/SmsService";

export default class BlogRoutes extends RESTRoutes {

    constructor() {
        super('Blog');
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        /**
         * The show route needs to be overriden to use username instead of id
         * The update and delete routes are the same
         */
        const apiRouter = super.generateRoutes({show: false, create: false, update: false, delete: false});

        // The show specific blog route
        apiRouter.get('/:name', (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // if private, send unauthorized so client can show password page
                    if (blog.private) {
                        return res.status(401).json({
                            error: true,
                            message: 'Blog is private',
                            blog: {
                                title: blog.title,
                                name: blog.name
                            }
                        });
                    } else {
                        // by default, blog should load with today's posts
                        req.db.repositories.PostRepository.findByBlogId(blog._id, req.db.connection, Date.now())
                            .then((posts) => {
                                return res.status(200).json({
                                    blog: {
                                        info: blog,
                                        posts: posts
                                    }
                                });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: "Could not load blog posts"
                                });
                            });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        message: "Could not find a blog with that name."
                    })
                });
        });

        // override create blog route
        apiRouter.post('/', tokenHelper.verifyToken, (req, res) => {
            // make sure the blog name doesn't already exist
            req.db.repositories[this.model + 'Repository'].findByName(req.body.name, req.db.connection)
                .then((blog) => {
                    if (!blog) {
                        // create blog document
                        req.body.users = [res.locals.user._id];
                        if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password);
                        // randomly assign number from our SmsHandler
                        req.body.assigned_no = SmsHandler.assignBlogNumber();

                        req.db.repositories[this.model + 'Repository'].create(req.body, req.db.connection)
                            .then((resource) => {
                                // add blog_id to user's blog array
                                let blogs = res.locals.user.blogs;
                                blogs.push(resource._id);
                                req.db.repositories.UserRepository.update(res.locals.user._id, {blogs: blogs}, req.db.connection);
                                return res.status(200).json(resource);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: err
                                })
                            });

                    } else {
                        return res.status(403).json({
                            error: true,
                            message: 'A blog with the same name already exists.'
                        });
                    }
                });

        });

        // The update specific blog route
        apiRouter.put('/:name', tokenHelper.verifyToken, (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // check that the user owns the blog
                    // @TODO: should we populate the users in the blog document or leave it as IDs
                    if (blog.users.indexOf(res.locals.user._id) >= 0) {
                        if (req.body.password) {
                            req.body.password = bcrypt.hashSync(req.body.password);
                        }
                        req.db.repositories[this.model + 'Repository'].update(blog._id, req.body, req.db.connection)
                            .then((resource) => {
                                return res.status(200).json(resource);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: err
                                })
                            });
                    } else {
                        res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to update this blog.'
                        });
                    }
                });
        });

        // The delete specific blog route
        apiRouter.delete('/:name', tokenHelper.verifyToken, (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // check that the user owns the blog
                    // @TODO: should we populate the users in the blog document or leave it as IDs
                    if (blog.users.indexOf(res.locals.user._id) >= 0) {
                        req.db.repositories[this.model + 'Repository'].delete(blog._id, req.db.connection)
                            .then((success) => {
                                if (success) {
                                    // delete blog from user's document
                                    for (var user of blog.users) {
                                        req.db.repositories.UserRepository.removeBlog(user, blog._id, req.db.connection);
                                    }

                                    // delete all posts
                                    req.db.repositories.PostRepository.deleteByBlogId(blog._id, req.db.connection);

                                    return res.status(200).json({
                                        error: false,
                                        message: 'Blog deleted successfully.'
                                    });
                                }
                            })
                            .catch((err) => {
                                return res.status(400).json({
                                    error: true,
                                    message: 'Could not delete blog.'
                                });
                            });
                    } else {
                        res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to delete this blog.'
                        });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        message: "Could not find a blog with that name."
                    });
                });
        });

        // This is the route for getting permissions to view a private blog
        apiRouter.post('/:name/auth', (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    if (blog.private) {
                        if (bcrypt.compareSync(req.body.password, blog.password)) {
                            tokenHelper.setBlogToken(blog, req, res);
                            return res.status(200).json(blog);
                        }
                        return res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to view this blog.'
                        });
                    } else {
                        return res.status(200).json(blog);
                    }
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: true,
                        message: "Could not find a blog with that name."
                    });
                });
        });

        // This is the route to retrieve the blog's posts limited by day
        apiRouter.get('/:name/posts', (req, res) => {
            // find the blog
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // if private, send unauthorized so client can show password page
                    if (blog.private && !tokenHelper.verifyBlogToken(blog, req)) {
                        return res.status(401).json({
                            error: true,
                            message: 'Blog is private',
                            blog: {
                                title: blog.title,
                                name: blog.name
                            }
                        });
                    } else {
                        // if no day is provided, load all posts
                        const day = req.query.day ? req.query.day : false;
                        req.db.repositories.PostRepository.findByBlogId(blog._id, req.db.connection, day)
                            .then((posts) => {
                                return res.status(200).json(posts);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: "Could not load blog posts"
                                });
                            });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        message: "Could not find a blog with that name."
                    })
                });
        });

        return apiRouter;
    }

}